import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {JwtPayload, ResponseMessage} from "./types"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {File} from "../schemas/file.schema";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class FilesService {

    constructor(
        @InjectModel("File") private readonly fileModel: Model<File>,
        private readonly jwtService: JwtService,
    ) {
    }


    async saveToDb(file: Express.Multer.File, token: string): Promise<ResponseMessage> {
        let payload: JwtPayload;

        try {
            payload = await this.jwtService.decode(token)
        } catch (e) {
            throw new InternalServerErrorException("Unable To Retrieve JWT Payload, ", e.message)
        }

        try {
            const processedFile = {
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                file: file.buffer,
                owner: payload.user.id,
            }
            await new this.fileModel(processedFile).save();
        } catch (e) {
            if (e.name === "ValidationError") {
                throw new InternalServerErrorException("Mongoose Validation Failed , ", e.message)
            }
            throw new InternalServerErrorException("Unable To Upload File, ", e.message)
        }

        return {message: "Successfully uploaded"};
    }

    async getFileList(token: string): Promise<File[]> {
        const {user}: JwtPayload = await this.jwtService.decode(token);
        return await this.fileModel.find({owner: user.id}, "name").exec()
    }

    async getFile(index: number): Promise<File> {
        return
    }
}
