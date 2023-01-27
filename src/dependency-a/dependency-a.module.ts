import { Module } from '@nestjs/common';
import { DependencyBModule } from 'src/dependency-b/dependency-b.module';
import { DependencyBService } from 'src/dependency-b/dependency-b.service';
import { DependencyAController } from './dependency-a.controller';
import { DependencyAService } from './dependency-a.service';

@Module({
    imports: [DependencyBModule],
    controllers: [DependencyAController],
    providers: [DependencyAService],
    exports: [DependencyAService]
})
export class DependencyAModule {}
