import { Injectable, Inject } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ItemService {
    @Inject(ProductService)
    private readonly productService:ProductService

    getItems(){
        const items = ["shoes","shirts","pants","sliders"]
        return items.map(item => item.toUpperCase())
    }
    
    async getProducts(){
        const response = await this.productService.getAllProducts()
        return response 
    }
}
