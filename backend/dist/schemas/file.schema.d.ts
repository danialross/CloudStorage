import { Document } from 'mongoose';
export declare class File extends Document {
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    data: Buffer;
    owner: string;
}
export declare const FileSchema: import("mongoose").Schema<File, import("mongoose").Model<File, any, any, any, Document<unknown, any, File> & File & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, File, Document<unknown, {}, import("mongoose").FlatRecord<File>> & import("mongoose").FlatRecord<File> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
