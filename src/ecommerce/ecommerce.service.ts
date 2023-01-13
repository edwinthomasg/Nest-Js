import { Injectable } from '@nestjs/common';
import { EcommerceDto } from './ecommerce.dto';
import { EcommerceRepository } from './ecommerce.respository';
import { Ecommerce } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceService {
    constructor(private readonly productRepository: EcommerceRepository) {}

    async createProduct(product: EcommerceDto): Promise<Ecommerce>{
        return this.productRepository.createProduct(product)
    }
    
    async getProduct(id: string): Promise<Ecommerce[]>{
        return this.productRepository.getProduct({_id: id})
    }
    
    async getProducts(): Promise<Ecommerce[]>{
        return this.productRepository.getProducts({})
    }
}
