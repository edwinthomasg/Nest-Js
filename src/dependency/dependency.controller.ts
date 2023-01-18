import { Controller, Get } from '@nestjs/common';
import { Products } from 'src/ecommerce/products.dto';
import { DependencyService } from './dependency.service';
import { OverideDependencyService } from './overide.service';

@Controller('dependency')
export class DependencyController {
    constructor(private dependencyService: DependencyService, private overideDependency: OverideDependencyService) {}
    
    @Get()
    getDependencyItems(): Products{
        console.log("dependency override : ",this.overideDependency.getDependencyItems())
        console.log(this.dependencyService === this.overideDependency)
        console.log(this.dependencyService.getDependencyItems())
        return this.dependencyService.getDependencyItems()
    }

}
