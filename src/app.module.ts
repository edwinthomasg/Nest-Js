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
import { ConfigService } from '@nestjs/config';
import { configYaml } from './config/config.yaml';
import { databaseConfig } from './config/database';
import { DependencyModule } from './dependency/dependency.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, expandVariables: true, load: [config, configYaml, databaseConfig], cache: true }), MongooseModule.forRoot('mongodb://localhost/db'), MovieModule, EcommerceModule, DependencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// IsGlobal Config : Config module available to all the modules, no need to import each and every time