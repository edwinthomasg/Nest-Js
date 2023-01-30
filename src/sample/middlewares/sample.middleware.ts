import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class SampleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("mid : ",req.headers)
        next()
    }

}