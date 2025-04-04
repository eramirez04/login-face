import { PartialType } from '@nestjs/swagger';
import { CreateJuegoDto } from './create-juego.dto';

export class UpdateJuegoDto extends PartialType(CreateJuegoDto) {}
