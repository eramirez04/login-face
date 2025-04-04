import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Logger } from '@nestjs/common';
// importamos la interfaz de redis, de esta forma podemos recibir o declarar clientes de redis
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  // almacena todos los clientes redis, que pueden ser => (default, suscriber, publisher)
  private clientes: Map<string, Redis> = new Map();

  public async onModuleDestroy(): Promise<void> {
    // cerrar todas las conexiones cuando al detener la aplicacion
    for (const [name, client] of this.clientes.entries()) {
      await client.quit();
    }
  }

  public getClient(name = 'default'): Redis {
    if (!this.clientes.has(name)) {
      const client = new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        db: Number(process.env.REDIS_DB),
        retryStrategy: (time) => Math.min(time * 50, 2000),
      });

      this.clientes.set(name, client);

      // Manejar eventos de conexión
      client.on('connect', () => {
        this.logger.log(`Cliente Redis '${name}' conectado exitosamente`);
      });

      client.on('error', (err) => {
        this.logger.error(`Error en cliente Redis '${name}': ${err.message}`);
      });
    }
    return this.clientes.get(name)!;
  }
}
