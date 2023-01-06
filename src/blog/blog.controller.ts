import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { BlogService } from './blog.service';
import { Roles } from './roles.decorator';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    // @SetMetadata('roles', ['admin'])
    @Roles('admin')
    getBlogs(){
        return this.blogService.getItems()
    }
    @Get('products')
    getProducts(){
        return this.blogService.getProducts()
    }
}
