import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

interface ChatMessage {
  user: string;
  mensaje: string;
  producto: string;
}

interface Eventos<T> {
  event: string;
  data: T;
}

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat',
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<string, Socket> = new Map();
  public constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() private server: Server;

  public handleConnection(client: Socket) {
    const idCliente: string = this.generateClienId(client);

    this.clients.set(idCliente, client);

    // Enviar mensaje de bienvenida
    const welcomeMessage: Eventos<string> = {
      event: 'welcome',
      data: 'Bienvenido al servidor de chat',
    };

    client.send(JSON.stringify(welcomeMessage));
  }

  public async handleDisconnect(client: Socket) {
    const clienteId: string = this.generateClienId(client);
    this.clients.delete(clienteId);
    await this.chatService.handleDisconnectService(client);
  }

  // Cuando un cliente se une a una sala
  @SubscribeMessage('joinProductRoom')
  public handleJoinRoom(
    @ConnectedSocket() cliente: Socket,
    @MessageBody() producto: { productId: string },
  ) {
    this.chatService.subscribirToProducto(producto.productId, cliente);
  }

  @SubscribeMessage('sendMessage')
  public async handleMessage(@MessageBody() payload: ChatMessage) {
    // Almacenar el mensaje

    const message = await this.chatService.addMessage(
      payload.user,
      payload.mensaje,
      payload.producto,
    );

    // Broadcast a todos los clientes conectados al producto
    await this.chatService.notificar(payload.producto, message);

    // Respuesta al emisor
    return {
      event: 'messageSent',
      data: { success: true, message: 'Mensaje enviado correctamente' },
    };
  }

  @SubscribeMessage('getMessages')
  public async handleGetMessages(@MessageBody() idProducto: { id: string }) {
    try {
      const messages = await this.chatService.getMessages(
        Number(idProducto.id),
      );
      return {
        event: 'allMessages',
        data: messages,
      };
    } catch (error) {
      return {
        event: 'error',
        data: { success: false, message: 'Error al obtener mensajes' },
      };
    }
  }

  private generateClienId(cliente: Socket): string {
    return `${cliente.handshake.address}:${cliente.id}`;
  }
}
