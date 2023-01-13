
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {

    @Prop()
    actor: string;

    @Prop()
    movie: string;

}

export const MovieSchema = SchemaFactory.createForClass(Movie);