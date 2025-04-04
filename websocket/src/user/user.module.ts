import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entidad
import { User } from './entities/user.entity';
import { Mensajes } from 'src/chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Mensajes],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
