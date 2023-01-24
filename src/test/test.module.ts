import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserRepository } from './respository/test.repository';
import { User, UserSchema } from './schemas/user.schema';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TestController],
  providers: [TestService, UserRepository],
})
export class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'v1/test/users', method: RequestMethod.POST });
  }
}
