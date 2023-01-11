import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { CustomersMiddleware } from './customers.middleware';
import { CustomersService } from './customers.service';

@Module({
  providers: [CustomersService]
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomersMiddleware)
    .forRoutes('customers')
  }
}
