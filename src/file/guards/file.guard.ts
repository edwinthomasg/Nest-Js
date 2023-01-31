import { CanActivate, ExecutionContext } from "@nestjs/common";

export class FileGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        return true
    }
}