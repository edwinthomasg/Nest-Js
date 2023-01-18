import { Products } from "src/ecommerce/products.dto";
import { DependencyService } from "./dependency.service";

export const value: DependencyService = {
    getDependencyItems: function (): Products {
        return new Products({
            specs: {
                color: 'green',
                size: '10inch',
            },
            productType: 'simple',
            name: 'apple',
            price: 20000,
            });
    }
}