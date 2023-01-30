import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

export class ExceptionFilters implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        // const req = host.switchToHttp().getRequest()
        // const res = host.switchToHttp().getResponse()
        console.log("type : ",host.getType())
        const [req,res, next] = host.getArgs()
       
        res.send({
            error: "error ocuured",
            path: req.path,
            timeStamp: new Date().toDateString()
        })
    }
}