import { Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './console.logger';



@Injectable()
export class VersionService {
    loggerService = new Logger(VersionService.name) // context will be shown in square brackets
    constructor(private myLogger: MyLogger) {
        this.myLogger.setContext('VersionService')
    }
    greetOthers(){
        console.log(this.loggerService.log("hei"))
        return "say hi to the browser"
    }

    greetOthers2(){
        console.log(this.myLogger.log("ola"))
        console.log(this.myLogger.customLog("edwin"))
        return "say hello to the browser"
    }
}
