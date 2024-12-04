import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/UserDto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() loginDetails: UserDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    const token = await this.authService.login(loginDetails);
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
    });
    return res.send('Login Successful');
  }
}
