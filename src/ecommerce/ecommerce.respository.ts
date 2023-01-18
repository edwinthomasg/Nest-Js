import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { FilterQuery, Model } from 'mongoose';
import { EcommerceDto } from './ecommerce.dto';
import { Ecommerce, EcommerceDocument } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceRepository {
     constructor(
     @InjectModel(Ecommerce.name)
     private ecommerceModel: Model<EcommerceDocument>, @Inject(CACHE_MANAGER) private cacheManager: Cache
     ) {}

     async createProduct(product: Ecommerce): Promise<Ecommerce> {
          console.log('product : ', product);
          const newProduct = new this.ecommerceModel(product);
          return await newProduct.save();
     }

     async getProduct(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
          console.log(await this.cacheManager.get('products'))
          const product = await this.ecommerceModel.find(filterQuery);
          return product;
     }

     async getProducts(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
          this.cacheManager.set('products', await this.ecommerceModel.find(filterQuery), 10000)
          console.log(await this.cacheManager.get('products'))
          return await this.ecommerceModel.find(filterQuery);
     }

     async updateById(updateQuery: FilterQuery<Ecommerce>, body: Partial<Ecommerce>) {
          return await this.ecommerceModel.findByIdAndUpdate(updateQuery, body, {new: true})
     }

     async deleteById(deleteQuery: FilterQuery<Ecommerce>){
          return await this.ecommerceModel.deleteOne(deleteQuery)
     }

     async getProductsByQueryFilter(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]>{
          await this.cacheManager.set("products", await this.ecommerceModel.find(filterQuery))
          console.log(await this.cacheManager.get("products"))
          await this.cacheManager.del("products")
          console.log(await this.cacheManager.get("products"))
          return await this.ecommerceModel.find(filterQuery)
     }
}
