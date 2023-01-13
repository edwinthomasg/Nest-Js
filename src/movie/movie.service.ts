import { Injectable } from "@nestjs/common";
import { MovieDto } from "./movie.dto";
import { MovieRepository } from "./movie.repository";
import { Movie } from "./schemas/movie.schema";


@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository) {}

    async createMovie(movie: MovieDto): Promise<Movie> {
        return this.movieRepository.create(movie)
    }

}
