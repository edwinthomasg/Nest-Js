import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Ecommerce, EcommerceDocument } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceRepository {
     constructor(
     @InjectModel(Ecommerce.name)
     private ecommerceModel: Model<EcommerceDocument>,
     ) {}

     async createProduct(product: Ecommerce): Promise<Ecommerce> {
     console.log('product : ', product);
     const newProduct = new this.ecommerceModel(product);
     return await newProduct.save();
     }

     async getProduct(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
     const product = await this.ecommerceModel.find(filterQuery);
     return product;
     }

     async getProducts(filterQuery: FilterQuery<Ecommerce>): Promise<Ecommerce[]> {
     return await this.ecommerceModel.find(filterQuery);
     }

     async updateById(updateQuery: FilterQuery<Ecommerce>, body: Partial<Ecommerce>) {
     return await this.ecommerceModel.findByIdAndUpdate(updateQuery, body, {new: true})
     }

     async deleteById(deleteQuery: FilterQuery<Ecommerce>){
          return await this.ecommerceModel.deleteOne(deleteQuery)
     }
}
