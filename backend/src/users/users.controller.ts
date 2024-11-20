import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMessage } from '../types';
import { UserDto } from '../dtos/UserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  )
  createUser(@Body() user: UserDto): Promise<ResponseMessage> {
    return this.usersService.createUser(user);
  }
}
