import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MyLogger } from './console.logger';
import { VersionController, VersionController2, VersionController3 } from './version.controller';
import { VersionMiddleware } from './version.middleware';
import { VersionService } from './version.service';

@Module({
    controllers: [VersionController, VersionController2, VersionController3],
    providers: [
        {
            provide: VersionService,
            useClass: VersionService
        },
        Logger,
        MyLogger
    ]
})
export class VersionModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VersionMiddleware)
        .forRoutes({path: 'version', method: RequestMethod.GET,  version: '3'})
    }
}
