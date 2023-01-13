import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie, MovieDocument } from "./schemas/movie.schema";

@Injectable()
export class MovieRepository {
    constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

    async create(movie: Movie): Promise<Movie> {
        const newMovie = new this.movieModel(movie);
        console.log("new movie : ",newMovie)
        return newMovie.save()
    }

}