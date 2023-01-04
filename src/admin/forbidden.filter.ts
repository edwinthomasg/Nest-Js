import { ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException) // carries metadata for http exception alone to filters
export class ForbiddenFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp() //returns interface with two methods to get http args
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()
        response.status(status)
        .json({
            statusCode: status,
            time: new Date().toDateString(),
            path: request.url
        })
    }
}