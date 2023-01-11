import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "axios";

export class CustomerNotFoundException extends HttpException {
    constructor(msg?: string, status?: HttpStatusCode){
        super(msg || 'user nahi', status || 404)
    }
}