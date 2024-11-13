import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ResponseMessage} from "./types"
import {InjectModel} from "@nestjs/mongoose";
import {Model, MongooseError} from "mongoose";
import {File} from "../schemas/file.schema";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {User} from "../schemas/user.schema";

@Injectable()
export class FilesService {
    constructor(@InjectModel("File") private readonly fileModel: Model<File>, private readonly jwtService: JwtService) {
    }


    async saveToDb(file: Express.Multer.File, token: string): Promise<ResponseMessage> {
        let payload: any;
        let hashedUsername: string;

        try {
            payload = await this.jwtService.decode(token)
        } catch (e) {
            throw new InternalServerErrorException("Unable To Retrieve JWT Payload, ", e.message)
        }

        try {
            hashedUsername = await bcrypt.hash(payload.user.name, 10)
        } catch (e) {
            throw new InternalServerErrorException("Error Occurred With Bcrypt :", e.message)
        }

        try {
            const processedFile = {
                name: file.originalname,
                type: file.mimetype,
                size: file.size,
                file: file.buffer,
                owner: hashedUsername,
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
}
