import { IsNumber } from "class-validator";

export class ParamsId{
    @IsNumber()
    id: string
}