import { ConsoleLogger } from "@nestjs/common";

export class MyLogger extends ConsoleLogger{
    error(message: any, stack?: string, context?: string){
        console.log(message)
        super.error('custom error')
    }
    log(message: any, stack?: string, context?: string){
        console.log("message : ",message)
    }
    customLog(name: string){
        console.log("how you doing !!", name)
    }
}
