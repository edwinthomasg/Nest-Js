import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeSchema, EMPLOYEE_MODEL } from './schemas/employee.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: EMPLOYEE_MODEL,
        schema: EmployeeSchema
    }])],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule {}
