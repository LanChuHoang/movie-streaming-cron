import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { YoutubeService } from './services/youtube.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [YoutubeService],
  exports: [YoutubeService],
})
export class SharedModule {}
