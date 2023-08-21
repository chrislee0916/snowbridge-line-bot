import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema } from 'src/database/schemas/default.schema';

export type AuthDocument = Auth & Document;

@Schema({
  timestamps: true,
  id: false,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class Auth extends DefaultSchema {
  @Prop({
    require: true,
    trim: true,
  })
  email: string;

  @Prop({
    trim: true,
    require: true,
  })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
