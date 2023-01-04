import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let body = req.body
    body.title = "Hugo Site"
    req.body = body
    console.log("middleware : ",req.body)
    next();
  }
}
