import { IsNumber, IsString } from "class-validator";

export class CreateDto{

    @IsString()
    name: string

    @IsNumber()
    age: number

    @IsString()
    gender: string

    @IsString()
    location: string
}