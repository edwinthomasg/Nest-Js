import { IsString } from "class-validator";
import { ClientDto } from "src/user/client/dto/client.dto";

export class EmployeeDto extends ClientDto{
    @IsString()
    employeeId: string

    @IsString()
    company: string
}