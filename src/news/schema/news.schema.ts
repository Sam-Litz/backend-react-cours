import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;


@Schema()
export class News{
  @Prop({ required: true , unique: true})
  title: string;

  @Prop()
  description: string;
  
  @Prop()
  linkSource: string;

  @Prop()
  linkImg: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);