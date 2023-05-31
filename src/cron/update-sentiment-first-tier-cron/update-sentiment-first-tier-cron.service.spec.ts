import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSentimentFirstTierCronService } from './update-sentiment-first-tier-cron.service';

describe('UpdateSentimentFirstTierCronService', () => {
  let service: UpdateSentimentFirstTierCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateSentimentFirstTierCronService],
    }).compile();

    service = module.get<UpdateSentimentFirstTierCronService>(UpdateSentimentFirstTierCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
