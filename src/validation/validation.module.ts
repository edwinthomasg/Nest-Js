import { HttpModule } from '@nestjs/axios';
import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { redisStore } from 'cache-manager-redis-store';
import { ClientOpts } from 'redis';
import { configYaml } from 'src/config/config.yaml';
import { zConfig } from 'src/config/z.yml';
import { LoggerModule } from 'src/logger/logger.module';
import { UserListener } from './listeners/user.listener';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersSchema, USERS_MODEL } from './schema/user.schema';

import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [
    HttpModule,
    MulterModule.register({dest: "./validation"}),
    ConfigModule.forFeature(zConfig),
    LoggerModule,
    MongooseModule.forFeature([{
    name: USERS_MODEL,
    schema: UsersSchema
  }]), CacheModule.register<ClientOpts>({
    ttl: 5,
    // @ts-ignore
    store: async () => {
      return await redisStore({
        socket: {
          host: "localhost",
          port: 6379,
        },
      });
    },
  })],
  controllers: [ValidationController],
  providers: [ValidationService, UserListener]
})
export class ValidationModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'validation', method: RequestMethod.GET, version: '2'
    })
  }
}
