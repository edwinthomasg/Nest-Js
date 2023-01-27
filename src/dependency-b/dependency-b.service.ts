import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DependencyAService } from 'src/dependency-a/dependency-a.service';

@Injectable()
export class DependencyBService {
    constructor(@Inject(forwardRef(() => DependencyAService)) private depAservice : DependencyAService ) {}
    getDepB(){
        return "Hi from b"
    }
}
