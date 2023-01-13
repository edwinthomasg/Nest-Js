import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EcommerceDto } from './ecommerce.dto';
import { EcommerceService } from './ecommerce.service';
import { Ecommerce } from './schemas/ecommerce.schems';

@Controller('ecommerce')
export class EcommerceController {
    constructor(private readonly ecommerceService: EcommerceService) {}
    @Post()
    async createMovie(@Body() body: EcommerceDto): Promise<Ecommerce>{
        return this.ecommerceService.createProduct(body)
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Ecommerce[]>{
        return this.ecommerceService.getProduct(id)
    }

    @Get()
    async getProducts(): Promise<Ecommerce[]>{
        return this.ecommerceService.getProducts()
    }
}
