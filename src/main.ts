import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global.filter';
import { ItemValidationPipe } from './item/item-validation.pipe';
import { ItemMiddleware } from './item/item.middleware';
import { ValidationPipe } from './customers/validation.pipe';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import { Logger, VersioningType } from '@nestjs/common';
import { CustomLogger } from './custom.logger';
import { MyLogger } from './version/console.logger';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ForbiddenFilter } from './test/filters/forbidden.filter';
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, 
    {
      // logger: false
    //   // logger: ['warn', 'error', 'log']
    //   // logger: console
    //   // logger: new CustomLogger()
    //   // logger: new MyLogger()
    // cors: true
    }
    ); // logger: console
  app.enableCors()
  const configService = app.get(ConfigService)
  app.use(ItemMiddleware)
  app.useGlobalPipes(new ValidationPipe())
  const portNumber = configService.get('PORT_NUMBER')
  // app.useGlobalFilters(new ForbiddenFilter(), new GlobalExceptionFilter())
  // app.use(session({
  //   secret: "my-secret",
  //   resave: false,
  //   saveUninitialized: false
  // }))
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  // app.useLogger(app.get(MyLogger)) // global custom logger declaration
  app.use(cookieParser()) //use cookies
  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.setViewEngine('ejs')
  // app.useGlobalFilters(new ForbiddenFilter())
  app.use(helmet())
  await app.listen(3030);
}
bootstrap();
