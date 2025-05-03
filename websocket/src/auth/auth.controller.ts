import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

/// guardia
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public login(@Body() login: CreateAuthDto) {
    console.log(login);

    return login;
  }

  //@UseGuards(AuthGuard)
  @Post('crear')
  public nose(@Body() body: CreateAuthDto) {
    return body;
  }
}
