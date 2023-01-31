import { IsDate, IsString } from "class-validator";

export class FolderDto{
    @IsString()
    folderName: string

    @IsString()
    folderSize: string

    @IsString()
    folderType: string

    @IsDate()
    createdAt: Date
}