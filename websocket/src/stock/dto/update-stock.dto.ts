import { CreateStockDto } from './create-stock.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateStockDto extends CreateStockDto {
  @IsNotEmpty()
  stock: number;
}
