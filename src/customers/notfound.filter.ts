import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express'

@Catch(HttpException)
export class NotFoundFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        response.json({
            statusCode: 400,
            msg: exception.response
        })
    }
}