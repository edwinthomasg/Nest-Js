import { Controller, Get } from "@nestjs/common";
import { FileService } from "src/file/file.service";
import { DynamicService } from "./dynamic.service";

@Controller('dynamic')
export class DynamicController{
    constructor(private readonly dynamicService: DynamicService,
        private fileService: FileService) {
        console.log(dynamicService)
    }

    @Get()
    getDynamicData(){
        console.log(this.fileService.getFileName())
        return this.dynamicService.getDynamicData()
    }
}