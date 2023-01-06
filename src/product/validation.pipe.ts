import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { array, object, ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    try{
      await this.schema.validateAsync(value,{abortEarly: false})
      return value
    }
    catch(err){
      if(err.isJoi === true)
      console.log("Joi Err : ",err.details)
    }
    
  }
}