import {CanActivate, ExecutionContext} from '@nestjs/common'
import e from 'express'
import { Observable } from 'rxjs'

export class AuthenticationGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const [req, res, next] = context.getArgs()
        if(req.headers.authorization === "Authorize")
        return true
        else
        return false
    }
} 