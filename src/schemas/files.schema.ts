import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";


@Schema()
export class File extends Document {

    @Prop({required: true})
    fileName: string

    @Prop({required: true})
    fileType: string

    @Prop({required: true})
    fileSize: number

    @Prop({default: Date.now()})
    createdAt: Date

    @Prop({required: true})
    fileData: Buffer
}

export const FileSchema = SchemaFactory.createForClass(File);