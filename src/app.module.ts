import { Module } from '@nestjs/common';
import { AppController, UserController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { ItemModule } from './item/item.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { ProductService } from './product/product.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { APP_PIPE } from '@nestjs/core';
import { ItemValidationPipe } from './item/item-validation.pipe';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { MongooseModule } from '@nestjs/mongoose'
import { MovieModule } from './movie/movie.module';
import { EcommerceController } from './ecommerce/ecommerce.controller';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from './database.config';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/db'), MovieModule, EcommerceModule, ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
