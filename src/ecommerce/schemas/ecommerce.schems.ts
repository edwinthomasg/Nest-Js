import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EcommerceDocument = HydratedDocument<Ecommerce>

@Schema()
export class Ecommerce {
    @Prop()
    productType: string

    @Prop()
    name: string

    @Prop()
    price: number
}

export const EcommerceSchema = SchemaFactory.createForClass(Ecommerce)