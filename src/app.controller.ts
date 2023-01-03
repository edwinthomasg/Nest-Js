import {
  Controller,
  Get,
  Req,
  Res,
  Redirect,
  Query,
  Param,
  HttpCode,
  Header,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { AppService, ProductService } from './app.service';
import { Request, Response } from 'express';
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
  }
}

// BASIC CRUD FOR ECOMMERCE WEBSITE
@Controller({ path: 'products' })
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Res() res: Response) {
    const data = await this.productService.getAllProducts();
    res.send(data);
  }

  @Get('/filter')
  async getProductByFilter(@Query() query: any) {
     const data = await this.productService.getProductByFilter(query.userId, query.id)
     return data
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    const data = await this.productService.getProduct(id);
    res.send(data);
  }

  @Post()
  async addProduct(@Body() body: any, @Res() res: Response){
    const status = await this.productService.addProduct(body)
    res.send("created").status(status)
  }

  @Put(":id")
  async updateProduct(@Param() params: any, @Body() body: any, @Res() res: Response){
    const status = await this.productService.updateProduct(params.id, body)
    res.send("updated").status(status)
  }
  
}

