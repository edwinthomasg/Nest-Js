import { HttpException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalPassportStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({ email: 'email'})
    }

    validate(username: string, password: string){
        const user = this.authService.validateUser(username, password)
        if(user) return user
        throw new HttpException('un authorized', 400)
    }
}