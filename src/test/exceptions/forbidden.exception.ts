import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "axios";

export class ForbiddenException extends HttpException{
    constructor(msg?: string, status?: HttpStatusCode) {
        super(msg || "NOT AUTHORIZED", status || 404);
    }
}