import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
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

  @Get()
  checkMovieRoute(){
    return this.movieService.checkMovieRoute()
  }

  @Get(":id")
  checkParamAsNumberOrNot(@Param("id", new ValidationPipe({transform: true})) id: number){
    console.log(typeof id) // normally id will be type of string but when transform true it will be transformed to number
    return id
  }

  @Get("inbuilt-pipe/:id")
  transformId(@Param("id", ParseIntPipe) id: number){
    console.log(typeof id) // normally id will be type of string but when transform true it will be transformed to number
    return id
  }

}