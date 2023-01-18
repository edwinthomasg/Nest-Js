import { Module } from '@nestjs/common';
import { DependencyController } from './dependency.controller';
import { DependencyService } from './dependency.service';
import { OverideDependencyService } from './overide.service';
import { value } from './use';


@Module({
  controllers: [DependencyController],
  providers: [{
    provide: DependencyService,
    useClass: OverideDependencyService
  },
  {
    provide: OverideDependencyService,
    // useClass: OverideDependencyService // this will never be singleton so two instance will be created even it is having same implementation
    useExisting: DependencyService
  },
  // {
  //   provide: DependencyService,
  //   useValue: value
  // }
  ]
})
export class DependencyModule {}
