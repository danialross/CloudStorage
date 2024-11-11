import {Injectable} from '@nestjs/common';
import {User} from "../schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {SearchUserDto} from "../dtos/searchUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private readonly userModel: Model<User>) {
    }

    async findUser(user: SearchUserDto): Promise<User> {
        try {
            return await this.userModel.findOne({name: user.name, password: user.password}).exec();
        } catch (e) {
            console.log("Error retrieving data mongoDB data with Mongoose : ", e);
        }
    }
}
