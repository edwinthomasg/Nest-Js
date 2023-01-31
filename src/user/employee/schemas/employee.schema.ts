import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Client } from "src/user/client/schemas/client.schema";


@Schema()
export class Employee extends Client {
    @Prop()
    employeeId: number

    @Prop()
    company: string
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
export type EmployeeDocument = Employee & Document
export const EMPLOYEE_MODEL = Employee.name