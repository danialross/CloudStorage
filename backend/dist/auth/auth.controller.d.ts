import { AuthService } from './auth.service';
import { UserDto } from '../dtos/UserDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDetails: UserDto): Promise<{
        token: string;
    }>;
}
