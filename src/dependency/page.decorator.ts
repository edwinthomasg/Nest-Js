import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Page = createParamDecorator(
    (data: string, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest()
        const page = req.params.page
        return page
    }
)