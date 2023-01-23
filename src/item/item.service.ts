import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ItemService {
    constructor(private apiService: HttpService) {}
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

    getApiData(): Observable<AxiosResponse>{
        return this.apiService.get("https://jsonplaceholder.typicode.com/posts")
    }
}
