import { IsNumber, IsString } from "class-validator";

export class StudentDto{
    @IsNumber()
    studentId:  number

    @IsString()
    school: string
}