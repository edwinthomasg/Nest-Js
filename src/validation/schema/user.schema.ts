import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Users{

    @Prop()
    name: string

    @Prop()
    age: number
    
    @Prop()
    gender: string

    @Prop()
    location: string
}

export type UsersDocument = HydratedDocument<Users>
export const UsersSchema = SchemaFactory.createForClass(Users)
export const USERS_MODEL = Users.name