import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class SampleInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log(context.getHandler().name)
        console.log(context.getClass().name)
        return next.handle().pipe(map(data => {
            return data.split(' ')[0]
        }))
    }
}