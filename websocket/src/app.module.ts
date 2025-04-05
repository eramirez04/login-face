import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { StockModule } from './stock/stock.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

// importamos para poder usar con postgres
import { TypeOrmModule } from '@nestjs/typeorm';

// importamos para redis
import { RedisModuls } from './redis/redis.module';
import { JuegosModule } from './juegos/juegos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),

    ChatModule,
    StockModule,
    ProductModule,
    AuthModule,
    UserModule,

    RedisModuls,

    JuegosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
/*  synchronize: process.env.DB_SYNCHRONIZE === 'true', */
