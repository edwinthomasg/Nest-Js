import { Controller, Get } from '@nestjs/common';
import { DependencyAService } from './dependency-a.service';

@Controller('dependencya')
export class DependencyAController {
    constructor(private depA_Service: DependencyAService) {}

    @Get()
    getDepA(){
        return this.depA_Service.getDepA()
    }
}
