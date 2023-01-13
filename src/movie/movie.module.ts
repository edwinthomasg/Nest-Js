import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MovieController } from "./movie.controller";
import { MovieRepository } from "./movie.repository";
import { MovieService } from "./movie.service";
import { Movie, MovieSchema } from "./schemas/movie.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
    controllers: [MovieController],
    providers: [MovieService,MovieRepository ]
})
export class MovieModule {}