import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegisterController } from "./register.controller";
import { RegisterService } from "./register.service";
import { RegisterRepository } from "./repository/register.repo";
import { RegisterSchema, REGISTER_MODEL } from "./schemas/register.schema";
import {AuthMiddleware} from './middlewares/auth.middleware'
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: REGISTER_MODEL,
        schema: RegisterSchema
      }
    ]),
    ConfigModule.forRoot({
      envFilePath: './register-env/.location.env'
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot()
  ],
  controllers: [RegisterController],
  providers: [RegisterService, RegisterRepository]
})
export class RegisterModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes({
    //   path: "register",
    //   method: RequestMethod.POST
    // })
  }
}