import { ArgumentMetadata, PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if(!metatype)
    {
        console.log("hello")
        return value
    }
    const object = plainToInstance(metatype, value)
    const valid = await validate(object)
    if(valid.length > 0)
    throw new BadRequestException("validation failed")
    return value
  }
//   toValidate(metatype: Function): boolean{
//     const types: Function[] = [String, Number, Array, Object, Boolean]
//     return !types.includes(metatype)
//   }
}
