import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dtos/UserDto';
import { ResponseMessage } from '../types';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findUser(user: UserDto): Promise<User> {
    try {
      return await this.userModel.findOne({ name: user.name }).exec();
    } catch (e) {
      console.log('Error retrieving data mongoDB data with Mongoose : ', e);
    }
  }

  async createUser(user: UserDto): Promise<ResponseMessage> {
    const existingUser = await this.findUser(user);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (err) {
      throw new InternalServerErrorException(
        'Error Occurred With Bcrypt : ',
        err,
      );
    }

    await new this.userModel(user).save();
    return { message: 'User created successfully' };
  }
}
