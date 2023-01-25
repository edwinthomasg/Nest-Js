import { IsNumber, IsString } from "class-validator"

export class UserDto {
    @IsString()
    name: string

    @IsNumber()
    age: number

    @IsNumber()
    id: number
}