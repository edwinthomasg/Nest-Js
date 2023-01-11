import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CustomerDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsNumber()
    age: number
}