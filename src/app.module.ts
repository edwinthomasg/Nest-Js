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
// import { GreetModule } from './user/user.module';
// import { UserService } from './user/user.service';
import { GreetingController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [ProductModule, ItemModule, AdminModule, BlogModule, CustomersModule, MongooseModule.forRoot('mongodb://localhost/movie')],
  controllers: [UserController, AppController, ItemController, AdminController, BlogController, CustomersController],
  providers: [AppService, ItemService, AdminService, ProductService, BlogService, CustomersService],
})
export class AppModule {}
