import {Injectable} from '@nestjs/common';
import {ResponseMessage} from "./types"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {File} from "../schemas/files.schema";

@Injectable()
export class FilesService {
    constructor(@InjectModel("File") private readonly fileModel: Model<File>) {
    }

    async upload(file: File): Promise<ResponseMessage> {
        return {message: "File Successfully Uploaded"}
    }
}
