import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MovieDto } from './movie.dto';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';


@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Post()
  async createMovieDocument(@Body() body: MovieDto): Promise<Movie> {
    console.log("body : ",body)
      return this.movieService.createMovie(body)
  }

}