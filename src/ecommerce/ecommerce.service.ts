import { Get, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EcommerceDto, UpdateDto } from './ecommerce.dto';
import { EcommerceRepository } from './ecommerce.respository';
import { Ecommerce } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceService {
    constructor(private readonly productRepository: EcommerceRepository, private configService: ConfigService) {}

    async createProduct(product: EcommerceDto): Promise<Ecommerce>{
        return this.productRepository.createProduct(product)
    }
    
    async getProduct(id: string): Promise<Ecommerce[]>{
        console.log("port number from env files : ",this.configService.get('PORT_NUMBER'))
        console.log("Secret Token : ",this.configService.get('SECRET_TOKEN'))
        let { username, password } = this.configService.get("database")
        console.log("database secrets : ",username, password)
        return this.productRepository.getProduct({_id: id})
    }
    
    async getProducts(): Promise<Ecommerce[]>{
        console.log(this.configService.get("db.sqlite"))
        console.log(this.configService.get("db.sql", "default value")) //if no key matches
        console.log(this.configService.get("database.host"), this.configService.get("database.port"))
        return this.productRepository.getProducts({})
    }

    async updateById(id: string, body: UpdateDto){
        return this.productRepository.updateById({_id: id}, body)
    }

    async deleteById(id: string){
        return this.productRepository.deleteById({_id: id})
    }
}
