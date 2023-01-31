import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, EMPLOYEE_MODEL } from '../employee/schemas/employee.schema';
import { StudentSchema, STUDENT_MODEL } from '../student/schemas/student.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientSchema, CLIENT_MODEL } from './schemas/client.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: CLIENT_MODEL, schema: ClientSchema}])],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule {}
