import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { EcommerceDto } from './ecommerce.dto';
import { EcommerceService } from './ecommerce.service';
import { Ecommerce } from './schemas/ecommerce.schems';

@Controller('ecommerce')
export class EcommerceController {
    constructor(private readonly ecommerceService: EcommerceService) {}

    // Creta a new movie document
    @Post()
    async createMovie(@Body(new ValidationPipe({ disableErrorMessages: false, whitelist: true, forbidNonWhitelisted: true })) body: EcommerceDto): Promise<Ecommerce>{
        return this.ecommerceService.createProduct(body)
    }
    
    // Get particular movie by specified id
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Ecommerce[]>{
        return this.ecommerceService.getProduct(id)
    }

    // Get all movide documents
    @Get()
    async getProducts(): Promise<Ecommerce[]>{
        return this.ecommerceService.getProducts()
    }

    // Update particular movie by specified id
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() body: EcommerceDto){
        return this.ecommerceService.updateById(id, body)
    }

    // Delete particular movie by specified id
    @Delete(':id')
    async deleteById(@Param('id') id: string){
        return this.ecommerceService.deleteById(id)
    }
}
