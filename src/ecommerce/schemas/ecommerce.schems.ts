import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EcommerceDocument = HydratedDocument<Ecommerce>

@Schema()
export class Ecommerce {
    
    @Prop()
    productType: string

    @Prop()
    name: string

    @Prop({ required: true })
    price: number

    @Prop(raw({
        color: { type: String },
        size: { type: String }
      }))
    specs: Record<string, any>;
}

export const EcommerceSchema = SchemaFactory.createForClass(Ecommerce)