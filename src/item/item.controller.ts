import { Controller,Get, UseFilters } from '@nestjs/common';
import { ForbiddenException } from 'src/admin/forbidden.exception';
import { GlobalException } from 'src/global.exception';
import { GlobalExceptionFilter } from 'src/global.filter';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService ) {}

    @Get()
    @UseFilters(GlobalExceptionFilter)
    getItems(){
        throw new GlobalException()
        return this.itemService.getItems()
    }
    @Get("products")
    getProducts(){
        throw new ForbiddenException()
        return this.itemService.getProducts()
    }
}
