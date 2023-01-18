import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceRepository } from './ecommerce.respository';
import { EcommerceService } from './ecommerce.service';
import { Products } from './products.dto';
import { Ecommerce, EcommerceSchema } from './schemas/ecommerce.schems';

class OverideEcommerceService extends EcommerceService {
  getSpecialData(): Products {
    return new Products({
      specs: {
        color: 'black',
        size: '20inch',
      },
      productType: 'simple',
      name: 'android',
      price: 20000,
    });
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ecommerce.name, schema: EcommerceSchema },
    ]),
    ConfigModule,
    CacheModule.register()
  ],
  controllers: [EcommerceController],
  providers: [{
    provide: EcommerceService, // Identifier or Token for dependency injection
    useClass: EcommerceService // Instance
  }, EcommerceRepository],
})
export class EcommerceModule {}


/** Caching
 * 1. Install cache-manager
 * 2. Import cache module and call register method
 * 3. Inject CACHE_MANAGER token inside a class service
 * 
 */