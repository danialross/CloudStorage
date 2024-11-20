import { ResponseMessage } from '../types';
import { Model } from 'mongoose';
import { File } from '../schemas/file.schema';
import { JwtService } from '@nestjs/jwt';
export declare class FilesService {
    private readonly fileModel;
    private readonly jwtService;
    constructor(fileModel: Model<File>, jwtService: JwtService);
    saveFile(file: Express.Multer.File, token: string): Promise<ResponseMessage>;
    getFileList(token: string): Promise<File[]>;
    getFile(fileId: string, token: string): Promise<File>;
    deleteFile(fileId: string, token: string): Promise<ResponseMessage>;
}
