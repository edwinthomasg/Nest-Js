import { Module } from '@nestjs/common';
import { DependencyAModule } from 'src/dependency-a/dependency-a.module';
import { DependencyBController } from './dependency-b.controller';
import { DependencyBService } from './dependency-b.service';

@Module({
    imports: [DependencyAModule],
    controllers: [DependencyBController],
    providers: [DependencyBService],
    exports: [DependencyBService]
})
export class DependencyBModule {}
