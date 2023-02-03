import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
  Sse,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegisterationDto } from './dto/register.dto';
import { RegisterService } from './register.service';
import { TransformPipe } from './pipes/transform.pipe';
import { diskStorage } from 'multer';
import { basename } from 'path';
import { AuthenticationGuard } from './guards/auth.guard';
import {RegisterInterceptor} from './interceptors/register.interceptors'
import { Register } from './schemas/register.schema';
import { RegisterEntity } from './entity/register.entity';
import { Request, Response } from 'express';
import { interval, map } from 'rxjs';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @UsePipes(TransformPipe)
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'resume',
          maxCount: 1,
        },
        {
          name: 'profile',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: './registeration',
          filename: (req, file, cb) => {
            const fileName = `${Math.floor(Math.random() * 1e12)}-${basename(
              file.mimetype,
            )}`;
            cb(null, fileName);
          },
        }),
      },
    ),
  )
  async registerClient(
    @Req() req: Request ,
    @Res({passthrough: true}) res: Response,
    @Body(new ValidationPipe({ transform: true })) entry: RegisterationDto,
    @UploadedFiles()
    files: { resume: Express.Multer.File; profile: Express.Multer.File },
  ) {
    console.log("cookies : ",req.cookies)
    res.setHeader('Access-Control-Allow-Origin', "*")
    return await this.registerService.registerClient(entry, files);
  }

  @Get(":id")
//   @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(RegisterInterceptor)
  async getClientById(@Param("id") id: string){
    return await this.registerService.getClientById(id)
  }

  @Get("render/template")
  @Render('index')
  getTemplate(){
    return {
        title: "Templates"
    }
  }

  @Sse("server-sent/notification")
  emitNotification(){
    return interval(1000).pipe(map((num: number) => {
      return ({
        data: `edwin, at interval ${num}`,
    })
    }))
  }
  
}
