import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserDto} from "../dtos/userDto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, forbidNonWhitelisted: true, whitelist: true}))
    async login(@Body() loginDetails: UserDto): Promise<{ token: string }> {
        const token = await this.authService.login(loginDetails)
        return {token: token}
    }
}
