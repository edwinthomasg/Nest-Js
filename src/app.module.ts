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


@Module({
  imports: [ProductModule, ItemModule, AdminModule],
  controllers: [UserController, AppController, ItemController, AdminController],
  providers: [AppService, ItemService, AdminService, ProductService]
})
export class AppModule {}
