import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Movie } from '../mongoose-schemas/movie.schema';

@Injectable()
export class UpdateSentimentFirstTierCronService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async main() {
    const movie = await this.movieModel.findOne({ title: /Thor/i });
    console.log(movie);
  }
}
