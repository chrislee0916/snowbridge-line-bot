import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DefaultSchema } from 'src/database/schemas/default.schema';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  id: false,
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
})
export class User extends DefaultSchema {
  @Prop({
    require: true,
  })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
