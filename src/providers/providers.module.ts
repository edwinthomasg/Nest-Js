import { Module } from '@nestjs/common';
import { TestModule } from 'src/test/test.module';
import { ConfigData } from './interfaces/interface.type';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

export class OverRideProviders {
  configData = {
    baseUrl: 'http://localhost:3000/aspire.systems',
    portNumber: 3000,
    title: 'Business site',
  };

  getConfigData() {
    return this.configData;
  }
}

const classDefinition = {
  getConfigData(): ConfigData {
    return {
      baseUrl: 'http://localhost:3000/aspire.systems/legacy',
      portNumber: 3000,
      title: 'Business site',
    };
  },
};

@Module({
  imports: [TestModule],
  controllers: [ProvidersController],
  providers: [
    // {
    //   provide: ProvidersService,
    //   useClass: OverRideProviders,
    // },
    {
        provide: ProvidersService,
        useValue: classDefinition
    },
    {
        provide: 'OVERRIDE_VALUE',
        useValue: new OverRideProviders()
    },
    {
        provide: 'USE_FACTORY',
        useFactory: (dev: boolean) => {
            return dev ? new ProvidersService() : new OverRideProviders()
        },
        inject: ['DEV']
    },
    {
        provide: 'DEV',
        useValue: false
    },
    {
        provide: 'USE_EXISTING',
        useExisting: ProvidersService
    }
  ],
  exports: [ProvidersService]
})
export class ProvidersModule {}
