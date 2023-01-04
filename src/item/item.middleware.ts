import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function ItemMiddleware(req: Request, res: Response, next: NextFunction){
  console.log("Functional Global Middleware ...")
  next()
}