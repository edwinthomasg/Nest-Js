import { IsNumber, IsString } from "class-validator";

export class ClientDto{
    @IsString()
    name: string

    @IsNumber()
    age: number

    @IsString()
    gender: string

    @IsString()
    email: string
}