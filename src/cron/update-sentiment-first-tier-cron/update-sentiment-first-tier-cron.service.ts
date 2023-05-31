import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UpdateSentimentFirstTierCronService {
  @Cron(CronExpression.EVERY_SECOND)
  main() {
    console.log("first tier cron job");
  }
}
