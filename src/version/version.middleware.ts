import { HttpException, NestMiddleware } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";


export class VersionMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if(req.headers['authorization'])
        next()
        else
        throw new HttpException('No Auth', HttpStatusCode.Forbidden)
    }

}