import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  public nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public precio: number;
}


