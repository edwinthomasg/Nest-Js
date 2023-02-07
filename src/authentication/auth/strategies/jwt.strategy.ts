import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "ragasiyam"
        })
    }

    validate(payload: any){
        console.log("decoded payload : ",payload)
        return {
            name: payload.name,
            series: payload.series
        }
    }
}