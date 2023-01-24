import { HttpException, NestMiddleware } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { ForbiddenException } from "../exceptions/forbidden.exception";

export class UserMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if(!req.headers.authorization)
        throw new ForbiddenException('No auth token', HttpStatusCode.Forbidden)
        else if(req.headers.authorization !== "hfdhjsfhh3uuiytuiwwjbjb4")
        throw new ForbiddenException('Token invalid', HttpStatusCode.Forbidden)
        else
        next()
    }
}