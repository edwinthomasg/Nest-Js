import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({
    discriminatorKey: "clientKind"
})
export class Client{
    
    @Prop()
    name: string

    @Prop()
    age: number

    @Prop()
    email: string

    @Prop()
    gender: string
}

export const ClientSchema = SchemaFactory.createForClass(Client)
export type ClientDocument = Client & Document
export const CLIENT_MODEL = Client.name
ClientSchema.set("discriminatorKey", "clientKind")