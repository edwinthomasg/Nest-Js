import { IsNumber, IsString } from "class-validator";

export class RegisterationDto{
    @IsString()
    name: string

    @IsString()
    qualification: string

    @IsNumber()
    year: number

}