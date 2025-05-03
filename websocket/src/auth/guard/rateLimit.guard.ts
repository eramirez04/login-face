import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import Redis from 'ioredis';

import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private redisClient: Redis;

  constructor(private redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ip =
      request.headers['x-forwarded-for']?.split(',')[0] || // Si viene detrás de un proxy
      request.connection?.remoteAddress || // Express
      request.socket?.remoteAddress || // Fastify
      'desconocido'; // En caso de que no haya IP

    const formattedIp = ip.replace('::ffff:', '');

    console.log(`IP detectada: ${formattedIp}`);

    // Asegurar que el objeto `requests` está definido
    if (!(await this.redisClient.get(formattedIp))) {
      await this.redisClient.setex(formattedIp, 60, 1);
    }

    const veces = await this.redisClient.get(formattedIp);
    console.log(typeof veces, veces);

    const hola = Number(veces) + 1;

    console.log(hola);

    await this.redisClient.setex(formattedIp, 60, 1);

    /* this.requests[formattedIp]++; // Incrementar correctamente */

    /*  this.redisClient.get(); */

    if (Number(veces) > 5) {
      throw new HttpException(
        'Demasiadas solicitudes',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
