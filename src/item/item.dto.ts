import { IsString, IsInt } from 'class-validator'

export class ItemDto{
    @IsInt()
    userId: number

    @IsInt()
    id: number

    @IsString()
    title: string

    @IsString()
    body: string
}