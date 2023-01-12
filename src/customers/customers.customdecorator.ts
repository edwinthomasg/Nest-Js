import { createParamDecorator, ExecutionContext, HttpException } from "@nestjs/common";
import { HttpStatusCode } from "axios";

export const Customer = createParamDecorator(
    (data: boolean, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if(!data) throw new HttpException('No Access', HttpStatusCode.Forbidden)
        return request.body
    }
)
