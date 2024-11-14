import {
    Controller, InternalServerErrorException,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Headers, Get, Req
} from '@nestjs/common';
import {FilesService} from "./files.service";
import {ResponseMessage} from "./types";
import {JwtauthGuard} from "../guards/jwtauth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import {File} from "../schemas/file.schema";

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {
    }

    @Post('upload')
    @UseGuards(JwtauthGuard)
    @UseInterceptors(FileInterceptor('file', {limits: {fileSize: 16 * 1024 * 1024}}))
    async upload(@UploadedFile() file: Express.Multer.File, @Headers("authorization") authHeader: string): Promise<ResponseMessage> {
        //get just the token
        const token = authHeader.split(" ")[1];

        try {
            return await this.fileService.saveToDb(file, token);
        } catch (e) {
            throw new InternalServerErrorException("Unable To Save File ,", e.message);
        }
    }

    @Get()
    async getFiles(@Headers("authorization") authHeader: string): Promise<File[]> {
        const token = authHeader.split(" ")[1];
        return await this.fileService.getFileList(token)
    }
}
