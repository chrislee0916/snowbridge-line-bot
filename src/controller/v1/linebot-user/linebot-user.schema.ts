import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DefaultSchema } from "src/database/schemas/default.schema";

export type LinebotUserDocument = LinebotUser & Document;

@Schema({
    timestamps: true,
    id: false,
    toJSON: { virtuals: true, getters: true},
    toObject: { virtuals: true, getters: true}
})
export class LinebotUser extends DefaultSchema {
    @Prop({
        required: true,
        trim: true
    })
    userId: string;

    @Prop({
        required: true,
        trim: true
    })
    name: string;

    @Prop({
        required: true,
        trim: true
    })
    phone: string;
}

export const LinebotUserSchema = SchemaFactory.createForClass(LinebotUser);
