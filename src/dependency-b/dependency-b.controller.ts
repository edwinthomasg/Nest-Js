import { Controller, Get } from '@nestjs/common';
import { DependencyBService } from './dependency-b.service';

@Controller('dependencyb')
export class DependencyBController {
    constructor( private depA_Service: DependencyBService) {}
    @Get()
    getDepA(){
        return this.depA_Service.getDepB()
    }
}
