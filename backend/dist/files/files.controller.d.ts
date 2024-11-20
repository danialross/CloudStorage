import { FilesService } from './files.service';
import { ResponseMessage } from '../types';
import { Response } from 'express';
import { File } from '../schemas/file.schema';
export declare class FilesController {
    private readonly fileService;
    constructor(fileService: FilesService);
    upload(file: Express.Multer.File, authHeader: string): Promise<ResponseMessage>;
    getFiles(authHeader: string): Promise<File[]>;
    getFile(authHeader: string, fileId: string, res: Response): Promise<void>;
    deleteFile(fileId: string, authHeader: string): Promise<ResponseMessage>;
}
