import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { map, Observable } from "rxjs";

export class UserInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
        .pipe(map(data => ({user: data})))
    }
}