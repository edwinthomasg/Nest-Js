import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private reflector : Reflector ){}

    canActivate(context: ExecutionContext): boolean{
        const [req, res] = context.getArgs()
        const reqRole = req.headers.role
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        if(roles.includes(reqRole))
        return true
        return false
    }
}
