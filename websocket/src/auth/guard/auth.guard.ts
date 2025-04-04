import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// modulo nativo de express
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // extraemos el tocken del header
    const tocken: string | undefined = this.extraerTocken(request);

    if (!tocken) {
      throw new UnauthorizedException();
    }

    try {
      if (tocken === 'hola') {
      }
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
