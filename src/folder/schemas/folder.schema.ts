import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FolderDocument = HydratedDocument<Folder>

@Schema()
export class Folder{
    @Prop()
    folderName: string

    @Prop()
    folderSize: string

    @Prop()
    folderType: string

    @Prop()
    createdAt: Date
}

export const FolderSchema = SchemaFactory.createForClass(Folder)