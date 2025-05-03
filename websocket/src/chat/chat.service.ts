import { Injectable } from '@nestjs/common';
import { Mensajes } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';

@Injectable()
export class ChatService {
  private redisCliente: Redis;
  // Mapa local para mantener referencia a las conexiones WebSocket
  private clientesWebSocket: Map<string, Socket> = new Map();

  public constructor(
    @InjectRepository(Mensajes)
    private mensajesRepository: Repository<Mensajes>,
    private redisService: RedisService,
  ) {
    this.initializeRedis();
  }

  private async initializeRedis() {
    try {
      this.redisCliente = this.redisService.getClient();
    } catch (error) {
      console.log('error inicializando servicio de suscripcion', error.message);
    }
  }

  public async addMessage(
    user: string,
    content: string,
    producto: string,
  ): Promise<Mensajes> {
    // crear el objetoo

    const mensaje = this.mensajesRepository.create({
      mensaje: content,
      producto: { id: Number(producto) },
      user: { id: Number(user) },
    });

    // guardar el objeto
    return await this.mensajesRepository.save(mensaje);
  }

  public async getMessages(idProduct: number): Promise<Mensajes[]> {
    return await this.mensajesRepository
      .createQueryBuilder('mensajes')
      .leftJoinAndSelect('mensajes.user', 'user')
      .innerJoinAndSelect('mensajes.producto', 'producto') // Asegura la relación con producto
      .select([
        'mensajes.id',
        'mensajes.mensaje',
        'mensajes.created_at',
        'user.id',
        'user.username',
        'user.email',
      ])
      .where('producto.id = :idProduct', { idProduct }) // Filtra correctamente por producto.id
      .getMany();
  }

  public async findMessageById(idMensaje: number) {
    return await this.mensajesRepository
      .createQueryBuilder('mensajes')
      .leftJoinAndSelect('mensajes.user', 'user')
      .innerJoinAndSelect('mensajes.producto', 'producto') // Asegura la relación con producto
      .select([
        'mensajes.id',
        'mensajes.mensaje',
        'mensajes.created_at',
        'user.id',
        'user.username',
        'user.email',
      ])
      .where('mensajes.id = :idMensaje', { idMensaje }) // Filtra correctamente por producto.id
      .getOne();
  }

  public async subscribirToProducto(
    producto: string,
    cliente: Socket,
  ): Promise<void> {
    try {
      const clienteId = cliente.id;

      // se añade de forma local
      this.clientesWebSocket.set(clienteId, cliente);

      await this.redisCliente.sadd(`sala:${producto}:producto`, clienteId);
      await this.redisCliente.sadd(`mensaje:${clienteId}:productos`, producto);
    } catch (error) {
      console.log(error);
    }
  }

  // este notifica a los clientes de nuevos mensajes
  public async notificar(producto: string, mensaje: Mensajes) {
    const clienteIds: Array<string> = await this.redisCliente.smembers(
      `sala:${producto}:producto`,
    );

    // obtenemos el mensaje de la base de datos
    const mensajeBD = await this.findMessageById(mensaje.id);

    for (const clienteId of clienteIds) {
      const clienteSocket = this.clientesWebSocket.get(clienteId);

      if (clienteSocket?.connected) {
        clienteSocket.emit('nuevoMensaje', mensajeBD);
      }
    }
  }

  public async handleDisconnectService(client: Socket): Promise<void> {
    const clienteId = client.id;

    try {
      // Obtener todos los productos a los que está suscrito este cliente
      const productos = await this.redisCliente.smembers(
        `mensaje:${clienteId}:productos`,
      );

      // Eliminar el cliente de todos los productos
      for (const producto of productos) {
        await this.redisCliente.srem(`sala:${producto}:producto`, clienteId);
      }

      // Limpiar datos del cliente
      await this.redisCliente.del(`mensaje:${clienteId}:productos`);
      this.clientesWebSocket.delete(clienteId);
    } catch (error) {
      console.error(
        `Error manejando desconexión del cliente ${clienteId}: ${error.message}`,
      );
    }
  }
}
