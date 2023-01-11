import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Customer = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.res)
        return request.user;
    }
)