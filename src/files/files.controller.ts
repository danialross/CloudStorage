import {
    Controller, InternalServerErrorException,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Headers, Get, Param, Res,
} from '@nestjs/common';
import {FilesService} from "./files.service";
import {ResponseMessage} from "./types";
import {JwtValidationGuard} from "../guards/jwt-validation.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Response} from "express";
import {File} from "../schemas/file.schema";
import {JwtService} from "@nestjs/jwt";

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService, private readonly jwtService: JwtService) {
    }

    @Post('upload')
    @UseGuards(JwtValidationGuard)
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
    @UseGuards(JwtValidationGuard)
    async getFiles(@Headers("authorization") authHeader: string): Promise<File[]> {
        const token = authHeader.split(" ")[1];
        return await this.fileService.getFileList(token)
    }

    @Get(":fileId")
    @UseGuards(JwtValidationGuard)
    async getFile(@Headers("authorization") authHeader: string, @Param("fileId") fileId: string, @Res() res: Response) {
        const token = authHeader.split(" ")[1];
        const file: File = await this.fileService.getFile(fileId, token)
        // console.log(file.data.toString('base64'))
        res.setHeader('Content-Type', file.type)
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`)
        res.send(file.data)
    }
}
