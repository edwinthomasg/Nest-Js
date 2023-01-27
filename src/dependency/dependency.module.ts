import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProvidersModule } from 'src/providers/providers.module';
import { DependencyController } from './dependency.controller';
import { DependencyService } from './dependency.service';
import { OverideDependencyService } from './overide.service';
import { value } from './use';

const devMode = false;

@Module({
  imports: [MulterModule.register({ dest: "./uploads"}), HttpModule, ProvidersModule],
  controllers: [DependencyController],
  providers: [
    {
      provide: DependencyService,
      useClass: OverideDependencyService,
    },
    {
      provide: OverideDependencyService,
      // useClass: OverideDependencyService // this will never be singleton so two instance will be created even it is having same implementation
      useExisting: DependencyService,
    },
    // {
    //   provide: DependencyService,
    //   useValue: value
    // },
    {
      provide: 'SERVICE',
      useFactory: () => {
        const service = devMode ? new DependencyService() : new OverideDependencyService();
        return service;
      },
    },
  ],
})
export class DependencyModule {}
