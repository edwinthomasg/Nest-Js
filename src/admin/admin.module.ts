import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { BlogModule } from 'src/blog/blog.module';
import { ProductController } from 'src/product/product.controller';
import { AdminController } from './admin.controller';
import { AdminMiddleware } from './admin.middleware';
import { AdminService } from './admin.service';

@Global()
@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
// EXCEPT PRODUCT ROUTE THIS MIDDLEWARE WILL BE APPLIED
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware)
    .exclude(
      { path: "product", method: RequestMethod.GET}
    )
    .forRoutes(ProductController, AdminController)
  }
}
