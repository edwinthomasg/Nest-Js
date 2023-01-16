import { IsNumber, IsObject, IsString } from "class-validator"


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