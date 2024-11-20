import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dtos/UserDto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validatePassword(loginPassword: string, userPassword: string): Promise<boolean>;
    login(loginDetails: UserDto): Promise<string>;
}
