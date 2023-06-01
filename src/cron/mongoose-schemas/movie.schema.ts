import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MOVIE_GENRES } from '../constants/movie.constant';
import { Media } from './media.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie extends Media {
  @Prop()
  runtime: number;

  @Prop()
  releaseDate: Date;

  @Prop({ type: [String], enum: MOVIE_GENRES })
  genres: string[];

  @Prop({ required: true, default: false })
  isUpcoming: boolean;

  @Prop()
  videoUrl: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
