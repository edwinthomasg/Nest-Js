import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Folder } from "src/folder/schemas/folder.schema";
import { Client } from "src/user/client/schemas/client.schema";

export type FileSchemaDocument = HydratedDocument<File>

@Schema()
export class File{
    @Prop()
    fileName: string

    @Prop()
    fileSize: string

    @Prop()
    fileType: string

    @Prop({type: mongoose.Types.ObjectId, ref: 'Folder'})
    folder: Folder

    @Prop()
    createdAt: Date

}

export const FileSchema = SchemaFactory.createForClass(File)