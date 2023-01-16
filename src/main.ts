import { NestFactory } from '@nestjs/core';
import { ForbiddenFilter } from './admin/forbidden.filter';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global.filter';
import { ItemValidationPipe } from './item/item-validation.pipe';
import { ItemMiddleware } from './item/item.middleware';
import { ValidationPipe } from './customers/validation.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.use(ItemMiddleware)
  app.useGlobalPipes(new ValidationPipe())
  const portNumber = configService.get('PORT_NUMBER')
  // app.useGlobalFilters(new ForbiddenFilter(), new GlobalExceptionFilter())
  await app.listen(portNumber);
}
bootstrap();
