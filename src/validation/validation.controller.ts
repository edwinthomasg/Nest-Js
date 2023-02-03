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
  Render,
  Req,
  Res,
  SerializeOptions,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { createReadStream, readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { basename, dirname, extname, join } from 'path';
import { CreateDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { FileStreamInterceptor } from './filestream.interceptor';
import { FileUploadPipe } from './pipes/file.pipe';

import { ValidationService } from './validation.service';

@Controller('validation')
export class ValidationController {
  constructor(private validationService: ValidationService) {}

  @Version('1')
  @Get()
  async getUser1(@Req() req: Request) {
    console.log(req.cookies);
    return 'no data found in version 1 and 3';
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
    excludePrefixes: ['email'],
  })
  getSerializedData(): UserEntity {
    return new UserEntity({
      name: 'edwin',
      email: 'edwin@gmail.com',
      password: 'edwin2918',
      company: {
        title: 'aspire',
        location: 'chennai',
      },
    });
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './validation-files',
        filename: (req, file, cb) => {
          const modFileName = `${Math.round(Math.random() * 1e9)}-${dirname(
            file.mimetype,
          )}`;
          console.log(modFileName)
          cb(null, modFileName);
        },
      }),
    }),
  )
  @UsePipes(FileUploadPipe)
  getFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  getFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('fields')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'yaml',
        maxCount: 1,
      },
      {
        name: 'text',
        maxCount: 1,
      },
    ]),
  )
  getFieldFiles(
    @UploadedFiles()
    files: {
      yaml?: Express.Multer.File[];
      text?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @Get("stream")
  // @UseInterceptors(FileStreamInterceptor)
  getFileStreamData(@Res({passthrough: true}) res: Response){
    const path = join(__dirname,"../../","config","./movie.yaml")
    const file = createReadStream(path, 'utf-8')
    // file.pipe(res)
    res.set({
      'Content-Type': 'application/json'
    })
    return new StreamableFile(file)
  }

  @Get("api-data")
  async getApiData(@Req() request: Request){
    return await this.validationService.getApiData()
  }

  @Get("template")
  @Render('index')
  getTemplate(){
    return {
      name: "Edwin",
      message: "Greetings"
    }
  }

  @Get("dynamic")
  getDynamicTemplates(@Res() res: Response){
      res.render(this.validationService.getDynamicTemplate(),{
        title: "dynamic",
        page: {
          title: "Home Page",
          content: "This is home page"
        }
      })
  }
}
