import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { ItemController } from './item.controller';
import { ItemMiddleware } from './item.middleware';
import { ItemService } from './item.service';

@Module({
    imports: [ProductModule],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService]
})
export class ItemModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ItemMiddleware)
        .forRoutes("item")
    }
}
