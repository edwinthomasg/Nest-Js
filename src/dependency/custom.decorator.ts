import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Custom = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        console.log(data)
        console.log(context.switchToHttp().getRequest().params)
        return context.switchToHttp().getRequest().params.id
    }
)