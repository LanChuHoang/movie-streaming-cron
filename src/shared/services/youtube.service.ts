import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YOUTUBE_ENDPOINT } from '../constants/youtube.constants';

@Injectable()
export class YoutubeService {
  apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('YOUTUBE_API_KEY');
  }

  async fetchComments(videoId: string, limit = 100) {
    const url = YOUTUBE_ENDPOINT.COMMENTS;
    const { nextPageToken, items } = (
      await this.httpService.axiosRef.get(url, {
        params: {
          key: this.apiKey,
          videoId,
          part: 'id,snippet',
          order: 'time',
          maxResults: limit,
        },
      })
    ).data;
    const comments = items.map((item) => ({
      id: item.id,
      video_id: item.snippet.videoId,
      content: item.snippet.topLevelComment.snippet.textOriginal,
      author_name: item.snippet.topLevelComment.snippet.authorDisplayName,
      author_profile_image_url:
        item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      like_count: item.snippet.topLevelComment.snippet.likeCount,
      published_at: item.snippet.topLevelComment.snippet.publishedAt,
      updated_at: item.snippet.topLevelComment.snippet.updatedAt,
    }));
    return { nextPageToken, comments };
  }
}
