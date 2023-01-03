import { Module } from '@nestjs/common';
import { AppController, ProductController, UserController } from './app.controller';
import { AppService, ProductService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
