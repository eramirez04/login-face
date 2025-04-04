import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

// producto servicio
import { ProductService } from 'src/product/product.service';

//
import { Socket } from 'socket.io';

@WebSocketGateway(8080, {
  namespace: '/stock',
  cors: true,
})
export class StockGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly stockService: StockService,
    private readonly productoService: ProductService,
  ) {}

  public handleConnection(client: Socket) {
    // Enviar mensaje de bienvenida
    const welcomeMessage = JSON.stringify({
      event: 'welcome',
      data: 'Conectado al sistema de actualización de stock en tiempo real',
    });
    client.emit('welcome', welcomeMessage);
  }

  public handleDisconnect(client: Socket) {
    this.stockService.handleDisconnectService(client);
  }

  @SubscribeMessage('subscribeToProduct')
  public async handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateStockDto,
  ) {
    const { productId } = payload;

    // Verificar que el producto existe
    const product = await this.productoService.findOne(productId);

    if (!product) {
      const errorMessage = JSON.stringify({
        event: 'error',
        data: `El producto ${productId} no existe`,
      });
      client.send(errorMessage);
      return;
    }

    // Suscribir al cliente al producto
    this.stockService.subscribirToProducto(productId, client);

    // Enviar confirmación y el stock actual
    const response = JSON.stringify({
      event: 'subscribed',
      data: {
        productId,
        currentStock: product.stock,
        message: `Suscrito a actualizaciones del producto ${productId}`,
      },
    });
    client.send(response);
  }

  @SubscribeMessage('cambiarStock')
  public async cambiarStockProucto(@MessageBody() payload: UpdateStockDto) {
    if (
      !payload.productId ||
      isNaN(Number(payload.productId)) ||
      Number(payload.productId) <= 0
    ) {
      /* return { error: 'envioError', mensaje: 'Error: productId no válido' }; */
      throw new WsException('credenciales incorrectas');
    }

    await this.productoService.updateStock(payload.productId, {
      stock: payload.stock,
    });

    // mensaje
    const message: string = JSON.stringify({
      event: 'revidoCambios',
      data: {
        mensage: 'producto actualizado',
      },
    });

    this.stockService.notificarSubscriptores(payload.productId, message);

    return {
      event: 'seCambio',
      nuevo: payload.stock,
    };
  }
}
