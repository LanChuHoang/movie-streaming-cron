import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { YoutubeService } from 'src/shared/services/youtube.service';
import { Movie } from '../mongoose-schemas/movie.schema';

@Injectable()
export class UpdateSentimentFirstTierCronService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async main() {
    const movies = await this.getMovies(1);
    for (const movie of movies) {
      console.log(movie.reviewClips.length);
      for (let i = 0; i < movie.reviewClips.length; i++) {
        try {
          const videoId = movie.reviewClips[i];
          const { nextPageToken, comments } =
            await this.youtubeService.fetchComments(videoId);
          console.log(nextPageToken);
          console.dir(comments, { depth: null });
        } catch (error) {
          console.dir(error.response?.data, { depth: null });
        }
      }
    }
  }

  getMovies(limit: number) {
    return this.movieModel.aggregate([
      { $match: { title: /Thor/ } },
      { $limit: limit },
      {
        $project: {
          reviewClips: 1,
        },
      },
    ]);
  }
}
