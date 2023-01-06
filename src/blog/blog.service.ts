import { Injectable, Inject } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class BlogService {
    @Inject(AdminService)
    private readonly adminService: AdminService
    @Inject(ProductService)
    private readonly productService: ProductService
    getItems(){
        return this.adminService.getAdminProfile()
    }
    getProducts(){
        return this.productService.getAllProducts()
    }
}
