import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Student{
    @Prop()
    studentId: number

    @Prop()
    school: string
}

export const StudentSchema = SchemaFactory.createForClass(Student)
export type StudentDocument = Student & Document
export const STUDENT_MODEL = Student.name