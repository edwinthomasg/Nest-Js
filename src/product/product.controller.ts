import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  Query,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { productSchema } from './product-joi.dto';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { ValidationPipe } from './validation.pipe';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Res() res: Response) {
    const data = await this.productService.getAllProducts();
    res.send(data);
  }

  @Get('/filter')
  async getProductByFilter(@Query() query: any) {
    const data = await this.productService.getProductByFilter(
      query.userId,
      query.id,
    );
    return data;
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const data = await this.productService.getProduct(id);
    res.send(data);
  }

  @Post()
  @UsePipes(new ValidationPipe(productSchema))
  async addProduct(@Body() body: ProductDto, @Res() res: Response) {
    const status = await this.productService.addProduct(body);
    res.send('created').status(status);
  }

  @Put(':id')
  async updateProduct(
    @Param() params: any,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const status = await this.productService.updateProduct(params.id, body);
    res.send('updated').status(status);
  }
}
