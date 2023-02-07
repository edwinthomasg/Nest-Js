import { Module } from '@nestjs/common';
import { AppController, UserController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { ItemModule } from './item/item.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { ProductService } from './product/product.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogModule } from './blog/blog.module';
import { APP_PIPE } from '@nestjs/core';
import { ItemValidationPipe } from './item/item-validation.pipe';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { EcommerceController } from './ecommerce/ecommerce.controller';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.config';
import { ConfigService } from '@nestjs/config';
import { configYaml } from './config/config.yaml';
import { databaseConfig } from './config/database';
import { DependencyModule } from './dependency/dependency.module';
import { VersionService } from './version/version.service';
import { VersionModule } from './version/version.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';
import { ProvidersModule } from './providers/providers.module';
import { DynamicController } from './dynamic/dynamic.controller';
import { DynamicModules } from './dynamic/dynamic.module';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { FolderController } from './folder/folder.controller';
import { FolderService } from './folder/folder.service';
import { FolderModule } from './folder/folder.module';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import { SampleModule } from './sample/sample.module';
import { LazyController } from './lazy/lazy.controller';
import { LazyService } from './lazy/lazy.service';
import { LazyModule } from './lazy/lazy.module';
import { ClientModule } from './user/client/client.module';
import { EmployeeModule } from './user/employee/employee.module';
import { StudentModule } from './user/student/student.module';
import { jsonConfig } from './config/json.config';
import { ValidationModule } from './validation/validation.module';
import { CronModule } from './cron/cron.module';
import { LoggerModule } from './logger/logger.module';
import * as Joi from 'joi';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RegisterModule } from './techniques/registeration/register/register.module';
// import { UserModule } from './user-management/user/user.module';
import { DbModule } from './user-management/db/db.module';
import { AppAuthModule } from './authentication/app-auth/app-auth.module';
import { AuthModule } from './authentication/auth/auth.module';
import { UserModule } from './authentication/user/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventGateway } from './gateway/gateway';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [config, configYaml, databaseConfig, jsonConfig],
      cache: true,
      envFilePath: './config/.db.env',
      // envFilePath: './config/.config.env',
      validationSchema: Joi.object({
        uri: Joi.string()
      })
      // ignoreEnvFile: true
    }),
    MongooseModule.forRoot('mongodb://localhost/database'),
    MovieModule,
    EcommerceModule,
    DependencyModule,
    BlogModule,
    VersionModule,
    TestModule,
    CustomersModule,
    AdminModule,
    ProvidersModule,
    // DynamicModules.register({ folder: './config', file: "./movie.yaml" }),
    DynamicModules.forRootAsync({
      useFactory: () => {
        return {
          folder: './config',
          file: './movie.yaml'
        }
      }
    }),
    FileModule,
    FolderModule,
    SampleModule.register({name: "Edwin"}),
    LazyModule,
    // ClientModule,
    // EmployeeModule,
    // StudentModule,
    ValidationModule,
    CronModule,
    LoggerModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.'
    }),
    RegisterModule,
    UserModule,
    DbModule,
    AppAuthModule,
    AuthModule,
    GatewayModule
  ],
  providers: [EventGateway]
})
export class AppModule {
  constructor(){
    console.log("intitialized app module")
  }
}

// IsGlobal Config : Config module available to all the modules, no need to import each and every time
