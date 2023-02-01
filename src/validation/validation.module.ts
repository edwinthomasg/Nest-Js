import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { redisStore } from 'cache-manager-redis-store';
import { ClientOpts } from 'redis';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersSchema, USERS_MODEL } from './schema/user.schema';

import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [
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
  providers: [ValidationService]
})
export class ValidationModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'validation', method: RequestMethod.GET, version: '2'
    })
  }
}
