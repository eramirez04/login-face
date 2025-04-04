import { Module } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { JuegosController } from './juegos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// entidad
import { Juego } from './entities/juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego])],
  controllers: [JuegosController],
  providers: [JuegosService],
  exports: [JuegosService],
})
export class JuegosModule {}
