import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class ForbiddenFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        response.json({
            statusCode: exception.status,
            msg: exception.response
        })
    }
}