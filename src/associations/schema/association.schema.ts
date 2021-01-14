import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssociationDocument = Association & Document;


@Schema()
export class Association{
  @Prop()
  nom: string;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);