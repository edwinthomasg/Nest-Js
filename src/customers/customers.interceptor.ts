import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { CustomerNotFoundException } from "./notfound.excpetion";

export class CustomerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle()
        .pipe(map(data => ({user: data})))
        .pipe(catchError(err => throwError(() => new CustomerNotFoundException("exception error reframed", 504))))

    }
}