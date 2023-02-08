import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LocalGuard } from '../auth/guards/local.guard';
import { AppAuthService } from './app-auth.service';
import { Public } from './public.decorator';

@Controller('app-auth')
export class AppAuthController {
    constructor(private authService: AuthService, private appAuth: AppAuthService){}
    @Post()
    @UseGuards(LocalGuard)
    async loginUser(@Req() req: Request){
        // return req.user
        const salt = await genSalt(10)
        console.log(salt)
        const hashedPassword = await hash( "password",salt)
        console.log(hashedPassword)
        console.log(await compare("password", hashedPassword))
        return this.authService.generateToken(req.user)
    }

    @Get()
    @UseGuards(JwtGuard)
    @Public()
    getUser(@Req() req: Request){
        // console.log(req.user)
        return req.user
    }
}
