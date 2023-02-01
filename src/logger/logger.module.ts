import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerServices } from './logger.service';

@Module({
  providers: [LoggerServices],
  controllers: [LoggerController],
  exports: [LoggerServices]
})
export class LoggerModule {}
