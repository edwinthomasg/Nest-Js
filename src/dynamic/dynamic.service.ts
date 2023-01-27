import { Inject, Injectable } from "@nestjs/common";
import { readFile } from "fs";
import { join } from "path";
import { TestService } from "src/test/test.service";
import { MODULE_OPTIONS_TOKEN } from "./dynamic.definition";

interface ConfigOptions {
    folder: string
    file: string
}

@Injectable()
export class DynamicService{
    // constructor(@Inject('CONFIG_OPTIONS') private readonly configOption: ConfigOptions ) {}
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: ConfigOptions,
    private testService: TestService) {
        console.log("inside service : ",TestService)
    }
    getDynamicData() {
        // console.log(this.configOption)
        // readFile(join(__dirname,"../",this.configOption.folder,this.configOption.file),'utf-8', (err, data) => {
        //     if(err) console.log(err)
        //     console.log(data)
        // })
        console.log(this.options)
       
        return "hello"
    }
}