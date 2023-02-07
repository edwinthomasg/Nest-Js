import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

import { LocalAuthGuard } from '../auth/guard/local-auth.guard';

@Controller('user')
export class UserController {
    constructor(private authService: AuthService){}
    @Get()
    @UseGuards(JwtAuthGuard)
    getPrivateData(@Req() req: Request): any {
        console.log("req : ",req.user)
        return req.user
    }

    @Post("login")
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request){
        console.log("body : ",req.body)
        return this.authService.login(req.body)
    }
}
