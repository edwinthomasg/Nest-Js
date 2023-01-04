import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("schema : ")
    return value;
  }
}