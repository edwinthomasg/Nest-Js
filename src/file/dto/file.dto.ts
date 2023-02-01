import { IsDate, IsOptional, IsString } from "class-validator";

export class FileDto{
    @IsString()
    fileName: string

    @IsString()
    fileSize: string

    @IsString()
    fileType: string

    @IsString()
    folder: string

    @IsDate()
    @IsOptional()
    createdAt: Date
}