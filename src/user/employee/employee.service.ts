import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDto } from './dto/employee.dto';
import { Employee, EmployeeDocument, EMPLOYEE_MODEL } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(EMPLOYEE_MODEL) private employeeModel: Model<EmployeeDocument>){}
    async createEmployee(employee: EmployeeDto): Promise<Employee>{
        const newEmployee = new this.employeeModel(employee)
        return await newEmployee.save()
    }
}
