import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SampleDocument = HydratedDocument<Sample>

@Schema()
export class Sample{
    @Prop()
    name: string

    @Prop()
    age: number
}

export const SampleSchemaDesign =  SchemaFactory.createForClass(Sample)