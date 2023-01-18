import { Injectable } from "@nestjs/common";
import { Products } from "src/ecommerce/products.dto";
import { DependencyService } from "./dependency.service";

@Injectable()
export class OverideDependencyService extends DependencyService{
    getDependencyItems(): Products {
        return new Products({
          specs: {
            color: 'red',
            size: '10inch',
          },
          productType: 'simple',
          name: 'android',
          price: 20000,
        })
      }
}

