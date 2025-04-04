import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
