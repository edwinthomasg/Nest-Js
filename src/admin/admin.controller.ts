import {
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { ForbiddenException } from './forbidden.exception';
import { ForbiddenFilter } from './forbidden.filter';
import { GlobalException } from 'src/global.exception';
import { GlobalExceptionFilter } from 'src/global.filter';

@Controller('admin')
// @UseFilters(ForbiddenFilter) // Controller level usage of filter
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  @UseFilters(ForbiddenFilter) // Route level usage of filter
  getAdminProfile(@Req() req: Request): string {
    const { auth } = req.query;
    if (auth === 'true') return this.adminService.getAdminProfile();
    // throw new HttpException('Not Authorized', HttpStatusCode.Unauthorized)
    else throw new ForbiddenException(); //Custom exception thrown
  }
  @Post('sign-in')
  signIn(@Req() req: Request) {
    console.log('Controller : ', req.body);
    // throw new ForbiddenException()
    throw new GlobalException();
    return this.adminService.signIn();
  }
}