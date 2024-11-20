import { UsersService } from './users.service';
import { ResponseMessage } from '../types';
import { UserDto } from '../dtos/UserDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(user: UserDto): Promise<ResponseMessage>;
}
