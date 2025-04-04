import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  exports: [RedisService],
  imports: [ConfigModule],
  providers: [RedisService],
})
export class RedisModuls {}
