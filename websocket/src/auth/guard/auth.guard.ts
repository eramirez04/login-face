import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// modulo nativo de express
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // extraemos el tocken del header
    const tocken: string | undefined = this.extraerTocken(request);

    if (!tocken) {
      throw new UnauthorizedException();
    }

    try {
      const decode = this.jwtService.verify(tocken, {
        secret: process.env.SECRET_KEY_JWT,
        algorithms: ['HS256'],
      });

      request.user = decode;
    } catch {
      throw new UnauthorizedException('Token no valido');
    }

    return true;
  }

  private extraerTocken(request: Request): string | undefined {
    const [type, tocken] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? tocken : undefined;
  }
}
