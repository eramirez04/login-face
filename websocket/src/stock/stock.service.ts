import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';
//
import { Socket } from 'socket.io';

@Injectable()
export class StockService {
  private redisClient: Redis;

  // Mapa local para mantener referencia a las conexiones WebSocket
  private clientesWebSocket: Map<string, Socket> = new Map();

  public constructor(private readonly redisService: RedisService) {
    this.initializeRedis();
  }

  private async initializeRedis() {
    try {
      this.redisClient = this.redisService.getClient();
    } catch (error) {
      console.log('error inicializando servicio de suscripcion', error.message);
    }
  }

  /**
   * Notifica a todos los clientes suscritos a un producto
   */
  public async notificarSubscriptores(
    producto: string,
    mensaje: string,
  ): Promise<void> {
    try {
      const clienteIds: Array<string> = await this.redisClient.smembers(
        `subscriptores:${producto}`,
      );

      for (const clienteId of clienteIds) {
        const cliente = this.clientesWebSocket.get(clienteId);

        if (cliente?.connected) {
          cliente.emit('productoActualizado', mensaje);
        }
      }
    } catch (error) {
      console.error(`Error notificando suscriptores: ${error.message}`);
    }
  }

  public async subscribirToProducto(
    producto: string,
    cliente: Socket,
  ): Promise<void> {
    try {
      const clienteId = cliente.id;

      // se añade de forma local
      this.clientesWebSocket.set(clienteId, cliente);

      // Guardar la relación cliente-producto en Redis
      await this.redisClient.sadd(`subscriptores:${producto}`, clienteId);
      await this.redisClient.sadd(`cliente:${clienteId}:productos`, producto);
    } catch (error) {
      console.log(error);
    }
  }

  public async handleDisconnectService(client: Socket): Promise<void> {
    const clienteId = client.id;

    try {
      // Obtener todos los productos a los que está suscrito este cliente
      const productos = await this.redisClient.smembers(
        `cliente:${clienteId}:productos`,
      );

      // Eliminar el cliente de todos los productos
      for (const producto of productos) {
        await this.redisClient.srem(`subscriptores:${producto}`, clienteId);
      }

      // Limpiar datos del cliente
      await this.redisClient.del(`cliente:${clienteId}:productos`);
      this.clientesWebSocket.delete(clienteId);
    } catch (error) {
      console.error(
        `Error manejando desconexión del cliente ${clienteId}: ${error.message}`,
      );
    }
  }
}
