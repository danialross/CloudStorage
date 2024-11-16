import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  size: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, type: Buffer })
  data: Buffer;

  @Prop({ required: true })
  owner: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
