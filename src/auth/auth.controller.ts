import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { AuthUser } from '../user/user.decorator';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUp: SignUp): Promise<User> {
    return this.authService.register(signUp);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Get('/me')
  @UseGuards(JWTAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
