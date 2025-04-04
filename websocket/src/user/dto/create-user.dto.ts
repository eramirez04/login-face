import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public nombre: string;

  @IsString()
  public apellido: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
