import { Injectable } from '@nestjs/common';
import { Products } from 'src/ecommerce/products.dto';

@Injectable()
export class DependencyService {
    getDependencyItems(): Products {
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
