import { ConfigurableModuleBuilder } from '@nestjs/common';

interface ConfigOptions {
  folder: string;
  file: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigOptions>().setClassMethodName('forRoot').build();
