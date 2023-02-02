import { CallHandler, ExecutionContext, NestInterceptor, StreamableFile } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class FileStreamInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
       return next.handle().pipe(map(data => {
           
       }))
    }
}