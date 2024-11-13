import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {FilesService} from "./files.service";
import {ResponseMessage} from "./types";
import {JwtauthGuard} from "../jwtauth/jwtauth.guard";
import {File} from "../schemas/files.schema";

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) {
    }

    @Post('upload')
    @UseGuards(JwtauthGuard)
    async upload(@Body() file: File): Promise<ResponseMessage> {
        return await this.fileService.upload(file)
    }
}
