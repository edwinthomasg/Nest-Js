import { Exclude, Expose, Transform } from "class-transformer"

export class Products{
    
    productType: string
    name: string
    @Transform(({ value }) => value.color)
    specs: object

    @Exclude()
    price: number
    
    @Expose()
    get productName(): string {
        return this.name
    }

    constructor(partial: Partial<Products>){
        Object.assign(this, partial)
    }
}