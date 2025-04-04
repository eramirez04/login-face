import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

// entidades
import { Mensajes } from './entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensajes]), User],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
