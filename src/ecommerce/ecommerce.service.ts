import { HttpService } from '@nestjs/axios';
import { Get, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { EcommerceDto, UpdateDto } from './ecommerce.dto';
import { EcommerceRepository } from './ecommerce.respository';
import { Products } from './products.dto';
import { Ecommerce } from './schemas/ecommerce.schems';

@Injectable()
export class EcommerceService {
  constructor(
    private readonly productRepository: EcommerceRepository,
    private configService: ConfigService,
    private apiService: HttpService
  ) {
  }

  getApiData(): Observable<AxiosResponse>{
    const res = this.apiService.get("http://localhost:3300/data")
    console.log(Object.keys(res))
    return res
  }

  async createProduct(product: EcommerceDto): Promise<Ecommerce> {
    return this.productRepository.createProduct(product);
  }

  async getProduct(id: string): Promise<Ecommerce[]> {
    console.log(
      'port number from env files : ',
      this.configService.get('PORT_NUMBER'),
    );
    console.log('Secret Token : ', this.configService.get('SECRET_TOKEN'));
    let { username, password } = this.configService.get('database');
    console.log('database secrets : ', username, password);
    return this.productRepository.getProduct({ _id: id });
  }

  async getProducts(){
    // console.log(this.configService.get('db.sqlite'));
    // console.log(this.configService.get('db.sql', 'default value')); //if no key matches
    // console.log(
    //   this.configService.get('database.host'),
    //   this.configService.get('database.port'),
    // );

    return await this.productRepository.getProducts({});
  }

  async updateById(id: string, body: UpdateDto) {
    return this.productRepository.updateById({ _id: id }, body);
  }

  async deleteById(id: string) {
    return this.productRepository.deleteById({ _id: id });
  }

  async getProductsByQueryFilter(productType: string): Promise<Ecommerce[]>{
    return await this.productRepository.getProductsByQueryFilter({productType})
  }

  getSpecialData(): Products {
    return new Products({
      specs: {
        color: 'white',
        size: '10inch',
      },
      productType: 'complex',
      name: 'smartphone',
      price: 20000,
    });
  }
}
