import {
  Body,
  CacheKey,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseInterceptors,
  ValidationPipe,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

import { ValidationService } from './validation.service';

@Controller('validation')
export class ValidationController {
  constructor(private validationService: ValidationService) {}

  @Version('1')
  @Get()
  async getUser1(@Req() req: Request) {
    console.log(req.cookies)
    return "no data found in version 1 and 3"
  }

  @Version('2')
  @Get()
  async getUser2() {
    return await this.validationService.getUser();
  }

  @Post()
  async createUser(@Body(new ValidationPipe()) user: CreateDto) {
    return await this.validationService.createUser(user);
  }

  // @Post()
  // async createUser(@Body(new ParseArrayPipe({
  //     items: CreateUserDto,
  //     whitelist: true,
  //     forbidNonWhitelisted: true
  // })) user: CreateUserDto[]){
  //     return await this.validationService.createUser(user)
  // }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) user: UpdateDto,
  ) {
    return await this.validationService.updateUser(user, id);
  }

  @Get('user')
  @Version(VERSION_NEUTRAL)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ["email"]
  })

  getSerializedData(): UserEntity {
    return new UserEntity({
      name: 'edwin',
      email: 'edwin@gmail.com',
      password: 'edwin2918',
      company: {
        title: "aspire",
        location: "chennai"
      }
    });
  }
}
