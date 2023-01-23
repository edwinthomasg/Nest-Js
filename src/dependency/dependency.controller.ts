import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Render,
  Res,
  Sse,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Products } from 'src/ecommerce/products.dto';
import { DependencyService } from './dependency.service';
import { OverideDependencyService } from './overide.service';
import { Express, Response } from 'express';
import { FilePipe } from './file.pipe';
import { diskStorage } from 'multer';
import { dirname, join } from 'path';
import { homedir } from 'os';
import { createReadStream } from 'fs';
import { Custom } from './custom.decorator';
import { HttpService } from '@nestjs/axios';
import { interval, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { stringify } from 'flatted';
import { Page } from './page.decorator';

interface MessageEvent {
    data: string | object;
  }

@Controller('dependency')
export class DependencyController {
  constructor(
    private dependencyService: DependencyService,
    private overideDependency: OverideDependencyService,
    @Inject('SERVICE') private service: DependencyService,
    private httpService: HttpService,
  ) {}

  @Get('axios/data')
  @Render('index')
  getAxiosData() {
    // this.httpService.get("http://localhost:3300/data").pipe(map(res => {
    //     console.log("data : ",res)
    // }))
    return { message: 'hi rendering engine' };
  }

  @Get()
  getDependencyItems(): Products {
    console.log(
      'dependency override : ',
      this.overideDependency.getDependencyItems(),
    );
    console.log(this.dependencyService === this.overideDependency);
    console.log(this.dependencyService.getDependencyItems());
    console.log('service : ', this.service.getDependencyItems()); //testing of use factory
    return this.dependencyService.getDependencyItems();
  }

  @Post('file-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const modFileName = `${Math.round(Math.random() * 1e9)}-${dirname(
            file.mimetype,
          )}`;
          cb(null, modFileName);
        },
      }),
    }),
  )
  @UsePipes(new FilePipe())
  uploadFiles(
    @UploadedFile()
    //     new ParseFilePipe({
    //     validators: [
    //         new MaxFileSizeValidator({ maxSize: 1000 }),
    //         new FileTypeValidator({ fileType: 'application/json' })
    //     ]
    // })
    file: Express.Multer.File,
  ) {
    file.buffer ? console.log(file.buffer.toString()) : console.log(file);
    return 'file posted';
  }

  @Post('multiple/upload')
  @UseInterceptors(FilesInterceptor('files', 2))
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files[0]);
  }

  @Post('multiple/file/upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pic1', maxCount: 1 },
      { name: 'pic2', maxCount: 1 },
    ]),
  )
  uploadFieldFiles(
    @UploadedFiles()
    files: {
      pic1?: Express.Multer.File[];
      pic2?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @Get('json-file')
  returnJsonFile() {
    const file = createReadStream(
      join(homedir(), '/Documents/Backend-Node/package.json'),
    );
    return new StreamableFile(file);
  }

  @Get('custom/declare/param/:id')
  getCustom(@Custom('id') id: number): number {
    console.log('id : ', id);
    return id;
  }

  @Get('template/render/engine/:page')
  renderTemplates(@Page() page: string, @Res() res: Response) {
    res.render(page);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((num: number) => ({
        data: 'hello'+num
    })))
  }
}
