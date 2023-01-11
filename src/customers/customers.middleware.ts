import { HttpCode, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CustomersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let {authorization} = req.headers
    if(!authorization)
    throw new HttpException('No Authorized token', HttpStatus.FORBIDDEN)
    console.log("Auth Completed")
    next();
  }
}
