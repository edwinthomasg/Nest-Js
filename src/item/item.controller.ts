import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ForbiddenException } from 'src/admin/forbidden.exception';
import { GlobalException } from 'src/global.exception';
import { GlobalExceptionFilter } from 'src/global.filter';
import { ItemDto } from './item.dto';
import { ItemService } from './item.service';
import { Response } from 'express';
import { ItemValidationPipe } from './item-validation.pipe';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  @UseFilters(GlobalExceptionFilter)
  getItems() {
    // throw new GlobalException();
    return this.itemService.getItems();
  }
  @Get('products')
  getProducts() {
    // throw new ForbiddenException();
    return this.itemService.getProducts();
  }
  @Post('products')
  addProductFromItem(@Body(new ItemValidationPipe()) body: ItemDto, @Res() res: Response) {
    res.send(body)
  }
}
