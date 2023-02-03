import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Register{
    @Prop()
    name: string

    @Prop()
    qualification: string

    @Prop()
    year: number

    @Prop()
    resume: string

    @Prop()
    profile: string
}

export const RegisterSchema = SchemaFactory.createForClass(Register)
export type RegisterDocument = Register & Document
export const REGISTER_MODEL = Register.name