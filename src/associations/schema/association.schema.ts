import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssociationDocument = Association & Document;


@Schema()
export class Association{
  @Prop({ required: true , unique: true})
  nom: string;

  @Prop()
  description: string;
  
  @Prop()
  lienSiteWeb: string;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);