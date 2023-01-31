import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeSchema, EMPLOYEE_MODEL } from "src/user/employee/schemas/employee.schema";
import { StudentSchema, STUDENT_MODEL } from "src/user/student/schemas/student.schema";
import { ClientSchema, CLIENT_MODEL } from "./client.schema";

const MODELS = [
    {
        name: CLIENT_MODEL,
        schema: ClientSchema,
        dicriminators: [
            {
                name: EMPLOYEE_MODEL,
                schema: EmployeeSchema
            },
            {
                name: STUDENT_MODEL,
                schema: StudentSchema
            }
        ]
    }
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(MODELS)],
    exports: [MongooseModule]
})

export class MongooseModelsModule {}