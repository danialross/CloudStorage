import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ResponseMessage } from '../types';
import { JwtValidationGuard } from '../guards/jwt-validation.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { File } from '../schemas/file.schema';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @UseGuards(JwtValidationGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 16 * 1024 * 1024 } }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ): Promise<ResponseMessage> {
    //get just the token
    const token = request.cookies['token'];
    try {
      return await this.fileService.saveFile(file, token);
    } catch (e) {
      throw new InternalServerErrorException(
        'Unable To Save File ,',
        e.message,
      );
    }
  }

  @Get()
  @UseGuards(JwtValidationGuard)
  async getFiles(@Req() request: Request): Promise<File[]> {
    const token = request.cookies['token'];
    return await this.fileService.getFileList(token);
  }

  @Get(':fileId')
  @UseGuards(JwtValidationGuard)
  async getFile(
    @Req() request: Request,
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) {
    const token = request.cookies['token'];
    const file: File = await this.fileService.getFile(fileId, token);
    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.send(file.data);
  }

  @Delete(':fileId')
  @UseGuards(JwtValidationGuard)
  async deleteFile(
    @Param('fileId') fileId: string,
    @Req() request: Request,
  ): Promise<ResponseMessage> {
    const token = request.cookies['token'];
    return await this.fileService.deleteFile(fileId, token);
  }
}
