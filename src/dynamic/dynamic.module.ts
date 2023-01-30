import { DynamicModule, Module } from "@nestjs/common";
import { FileModule } from "src/file/file.module";
import { TestModule } from "src/test/test.module";
import { DynamicController } from "./dynamic.controller";
import { ConfigurableModuleClass } from "./dynamic.definition";
import { DynamicService } from "./dynamic.service";

export interface DynamicOptions {
  folder: string
  file: string
}

@Module({
  imports: [TestModule, FileModule],
  controllers: [DynamicController],
  providers: [DynamicService],
  exports: [DynamicService]
})
export class DynamicModules extends ConfigurableModuleClass{
  // static register(options: DynamicOptions) : DynamicModule{
  //   return {
  //     module: DynamicModules,
  //     controllers: [DynamicController],
  //     providers: [
  //       DynamicService,
  //       {
  //         provide: 'CONFIG_OPTIONS',
  //         useValue: options
  //       }
  //     ],
  //     exports: [DynamicService]
  //   }
  // }
}