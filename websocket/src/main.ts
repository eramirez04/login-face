import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/* import { WsAdapter } from '@nestjs/platform-ws'; // 👈 Esto es lo que faltaba */

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // configuramos las validaciones
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configurar el adaptador WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));

  // Habilitar CORS
  app.enableCors();

  //documentacion de la api http
  const config = new DocumentBuilder()
    .setTitle('aplicacion de ejemplo')
    .setDescription('emersson Ramirez Ruiz')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // configuracion del puerto
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
  console.log(`Servidor WebSocket corriendo en ws://localhost:${port}/chat`);
}
bootstrap();
