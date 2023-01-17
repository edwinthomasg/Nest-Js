import { ConsoleLogger, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MovieDto } from "./movie.dto";
import { MovieRepository } from "./movie.repository";
import { Movie } from "./schemas/movie.schema";


@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository, private configService: ConfigService) {}

    async createMovie(movie: MovieDto): Promise<Movie> {
        return this.movieRepository.create(movie)
    }

    checkMovieRoute(){
        console.log(this.configService.get("server"))
        const movieConfig = this.configService.get("server")
        if(!movieConfig) throw new Error("environment variables not found from env file")
        return "success"
    }
}
