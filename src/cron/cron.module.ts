import { Module } from '@nestjs/common';
import { UpdateSentimentFirstTierCronService } from './update-sentiment-first-tier-cron/update-sentiment-first-tier-cron.service';

@Module({
  providers: [UpdateSentimentFirstTierCronService]
})
export class CronModule { }
