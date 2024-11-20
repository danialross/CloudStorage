import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/UserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDetails: UserDto): Promise<{ token: string }> {
    const token = await this.authService.login(loginDetails);
    return { token: token };
  }
}
