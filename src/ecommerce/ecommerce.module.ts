import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceRepository } from './ecommerce.respository';
import { EcommerceService } from './ecommerce.service';
import { Ecommerce, EcommerceSchema } from './schemas/ecommerce.schems';

@Module({
  imports: [MongooseModule.forFeature([{name: Ecommerce.name, schema: EcommerceSchema}])],
  controllers: [EcommerceController],
  providers: [EcommerceService, EcommerceRepository]
})
export class EcommerceModule {}
