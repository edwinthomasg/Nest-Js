import { IsNumber, IsObject, IsString } from "class-validator"
import {PartialType, OmitType} from '@nestjs/mapped-types'

export class EcommerceDto{
    
    @IsString()
    productType: string

    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsObject()
    specs: object
}

export class Ram{
    @IsString()
    ram: string
}

// This class returns update dto class reference which has optional arguments to be passed in update body
// export class UpdateDto extends PartialType(EcommerceDto) { }
// This class will omit the name type from ecommerce dto, so it can be any type
export class UpdateDto extends OmitType(EcommerceDto, ['name'] as const) { }
