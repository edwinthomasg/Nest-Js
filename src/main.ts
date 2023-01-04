import { NestFactory } from '@nestjs/core';
import { ForbiddenFilter } from './admin/forbidden.filter';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global.filter';
import { ItemMiddleware } from './item/item.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(ItemMiddleware)
  // app.useGlobalFilters(new ForbiddenFilter(), new GlobalExceptionFilter())
  await app.listen(3000);
}
bootstrap();
