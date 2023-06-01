import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './mongoose-schemas/movie.schema';
import { Person, PersonSchema } from './mongoose-schemas/person.schema';
import { Show, ShowSchema } from './mongoose-schemas/show.schema';
import { UpdateSentimentFirstTierCronService } from './update-sentiment-first-tier-cron/update-sentiment-first-tier-cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: Show.name, schema: ShowSchema },
      { name: Person.name, schema: PersonSchema },
    ]),
  ],
  providers: [UpdateSentimentFirstTierCronService],
})
export class CronModule {}
