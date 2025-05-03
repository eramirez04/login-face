import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

// servicios de otras clases
import { UserService } from 'src/user/user.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

// entidades
import { User } from 'src/user/entities/user.entity';

export interface retornar {
  access_token: string;
  user: string;
  email: string;
}

export interface AuthServicesignIn {
  signIn(data: CreateAuthDto): Promise<retornar>;
}

@Injectable()
export class AuthService implements AuthServicesignIn {
  public constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(data: CreateAuthDto): Promise<retornar> {
    const user: User | null = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('usuarios no encontrado');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const jwtOptions: JwtSignOptions = {
      secret: process.env.SECRET_KEY_JWT,
      expiresIn: process.env.EXPIRESIN,
    };

    const tocken = await this.jwtService.signAsync(payload, jwtOptions);

    return {
      access_token: tocken,
      email: user.email,
      user: user.username,
    };
  }
}
