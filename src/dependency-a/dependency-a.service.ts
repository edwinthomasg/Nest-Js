import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DependencyBService } from 'src/dependency-b/dependency-b.service';

@Injectable()
export class DependencyAService {
    constructor(@Inject(forwardRef(() => DependencyBService)) private depBservice: DependencyBService) {}
    getDepA(){
        console.log(this.depBservice.getDepB())
        return "hello from a"
    }
}
