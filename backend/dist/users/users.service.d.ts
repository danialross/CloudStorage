import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dtos/UserDto';
import { ResponseMessage } from '../types';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findUser(user: UserDto): Promise<User>;
    createUser(user: UserDto): Promise<ResponseMessage>;
}
