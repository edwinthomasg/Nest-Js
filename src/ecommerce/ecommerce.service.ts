import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EcommerceDto } from './ecommerce.dto';
import { EcommerceRepository } from './ecommerce.respository';
import { Ecommerce } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceService {
    constructor(private readonly productRepository: EcommerceRepository, private configService: ConfigService) {}

    async createProduct(product: EcommerceDto): Promise<Ecommerce>{
        return this.productRepository.createProduct(product)
    }
    
    async getProduct(id: string): Promise<Ecommerce[]>{
        console.log("Secret Token : ",this.configService.get('SECRET_TOKEN'))
        return this.productRepository.getProduct({_id: id})
    }
    
    async getProducts(): Promise<Ecommerce[]>{
        return this.productRepository.getProducts({})
    }

    async updateById(id: string, body: EcommerceDto){
        return this.productRepository.updateById({_id: id}, body)
    }

    async deleteById(id: string){
        return this.productRepository.deleteById({_id: id})
    }
}
