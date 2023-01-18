import { Body, CacheInterceptor, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { EcommerceDto, UpdateDto } from './ecommerce.dto';
import { EcommerceService } from './ecommerce.service';
import { Products } from './products.dto';
import { Ecommerce } from './schemas/ecommerce.schems';

@Controller('ecommerce')
export class EcommerceController {
    constructor(private readonly ecommerceService: EcommerceService) {}
    // @UseInterceptors(CacheInterceptor)
    @Get("/query/filter")
    async getProductsByQueryFilter(@Query('product_type') productType: string): Promise<Ecommerce[]>{
        return await this.ecommerceService.getProductsByQueryFilter(productType)
    }

    @Get("/query")
    getByQuery(@Query('id', new ParseArrayPipe({ items: Number , separator: ','})) id: number[]){
        console.log(id)
        return id
    }

    // Creta a new movie document
    @Post()
    async createMovie(@Body(new ValidationPipe({ disableErrorMessages: false, whitelist: true, forbidNonWhitelisted: true, transform: true })) body: EcommerceDto): Promise<Ecommerce>{
        console.log("body : ",typeof body.price)
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
    async updateById(@Param('id') id: string, @Body(new ValidationPipe()) body: UpdateDto){
        return this.ecommerceService.updateById(id, body)
    }

    // Delete particular movie by specified id
    @Delete(':id')
    async deleteById(@Param('id') id: string){
        return this.ecommerceService.deleteById(id)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("special/data")
    getSpecialData(): Products{
       return this.ecommerceService.getSpecialData()
    }
}
