import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { UserDto } from "../dto/User.dto";

export const Update = createParamDecorator(
    (data: UserDto, context: ExecutionContext) => {
        let body = context.switchToHttp().getRequest<Request>().body
        body.name = body.name.toUpperCase()
        return body
    }
)