import { LoggerService, LogLevel } from "@nestjs/common";

export class CustomLogger implements LoggerService{
    log(message: any, ...optionalParams: any[]) {
        console.log("custom log : ",message)
    }
    error(message: any, ...optionalParams: any[]) {
        console.log("custom error : ",message)
    }
    warn(message: any, ...optionalParams: any[]) {
        console.log("custom warning : ",message)
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.log("custom debug : ",message)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        console.log("custom verbose : ",message)
    }
    setLogLevels?(levels: LogLevel[]) {
        console.log("custom levels : ",levels)
    }
    
}