import {
  Controller,
  Get,
  Redirect,
  Query,
  Param,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): void {
    console.log(this.appService.getHello());
  }
  @Get('/test')
  testMethod(): string {
    return this.appService.testMethod();
  }
}

@Controller({ path: 'search' })
export class UserController {
  @Get('/')
  @Redirect('https://www.google.com', 301)
  signUp(@Query('mode') mode: string): object | undefined {
    if (mode && mode === 'youtube')
      return { url: 'https://www.youtube.com', statusCode: 302 };
  }
  @Get('/java/:id')
  @HttpCode(200) //when cache is diabled in web browser
  openJava(@Param('id') id: any): string | undefined {
    if (id && id === '1') return 'you are on 1st page';
    else return `you are on ${id} page`
  }
}


