import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { LocalGuard } from '../auth/guards/local.guard';
import { Public } from './public.decorator';

@Controller('app-auth')
export class AppAuthController {
    constructor(private authService: AuthService){}
    @Post()
    @UseGuards(LocalGuard)
    loginUser(@Req() req: Request){
        // return req.user
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
