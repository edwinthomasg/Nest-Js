import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { ProductModule } from 'src/product/product.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [AdminModule, ProductModule],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService]
})
export class BlogModule {
}
