import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService){}
    validateUser(username: string, password: string){
        const user = this.userService.getUser(username)
        if(!user) throw new Error("No user exist")
        if(user.password !== password) throw new Error("Un Authorized")
        return user
    }

    generateToken(payload: any){
        return {
            access_token: this.jwtService.sign({
                name: payload.name,
                series: payload.series
            })
        }
    }
}
