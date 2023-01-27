import { Controller, Get } from "@nestjs/common";
import { DynamicService } from "./dynamic.service";

@Controller('dynamic')
export class DynamicController{
    constructor(private readonly dynamicService: DynamicService) {
        console.log(dynamicService)
    }

    @Get()
    getDynamicData(){
        return this.dynamicService.getDynamicData()
    }
}