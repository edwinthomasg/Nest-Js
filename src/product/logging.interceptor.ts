import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    console.log(context.switchToHttp().getRequest().params)
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {console.log(`After... ${Date.now() - now}ms `)
        console.log(context.switchToHttp().getResponse())
    }),
      );
    }
}