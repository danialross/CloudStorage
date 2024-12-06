import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/UserDto';
import { Response, Request } from 'express';
import { JwtValidationGuard } from '../guards/jwt-validation.guard';

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
      sameSite: 'lax',
    });
    return res.status(200).send('Login Successful');
  }

  @Get('/verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['token'];
    const result = await this.authService.verifyToken(token);
    return res.status(200).send(result);
  }

  @Post('/logout')
  @UseGuards(JwtValidationGuard)
  async logout(@Res() res: Response) {
    res.cookie('token', '', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.status(200).send('Logout Successful');
  }
}
