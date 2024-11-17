import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload, ResponseMessage } from '../types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '../schemas/file.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('File') private readonly fileModel: Model<File>,
    private readonly jwtService: JwtService,
  ) {}

  async saveToDb(
    file: Express.Multer.File,
    token: string,
  ): Promise<ResponseMessage> {
    let payload: JwtPayload;

    try {
      payload = await this.jwtService.decode(token);
    } catch (e) {
      throw new InternalServerErrorException(
        'Unable To Retrieve JWT Payload, ',
        e,
      );
    }

    try {
      const processedFile = {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        data: file.buffer,
        owner: payload.user.id,
      };
      await new this.fileModel(processedFile).save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return { message: 'File Successfully Uploaded' };
  }

  async getFileList(token: string): Promise<File[]> {
    const { user }: JwtPayload = await this.jwtService.decode(token);
    try {
      return await this.fileModel.find({ owner: user.id }, 'name').exec();
    } catch (e) {
      throw new InternalServerErrorException(
        'Error Occurred When Retrieving Data, ',
        e,
      );
    }
  }

  async getFile(fileId: string, token: string): Promise<File> {
    let file: File;
    try {
      file = await this.fileModel.findOne({ _id: fileId }).exec();
    } catch (e) {
      throw new InternalServerErrorException(
        'Error Occurred When Retrieving Data, ',
        e,
      );
    }

    if (!file) {
      throw new NotFoundException('File Does Not exist');
    }

    const { id: userId } = await this.jwtService.decode(token).user;

    if (file.owner !== userId) {
      throw new UnauthorizedException('Does Not Have Access to File');
    }
    return file;
  }

  async deleteFile(fileId: string, token: string): Promise<ResponseMessage> {
    //check if file exists and belongs to requester
    await this.getFile(fileId, token);
    await this.fileModel.deleteOne({ _id: fileId }).exec();
    return { message: 'File Successfully Deleted' };
  }
}
