import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Post()
    createEmployee(@Body() employee: EmployeeDto): Promise<Employee>{
        return this.employeeService.createEmployee(employee)
    }
}
