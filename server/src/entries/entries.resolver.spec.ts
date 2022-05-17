import { Test, TestingModule } from '@nestjs/testing';
import { EntriesResolver } from './entries.resolver';
import { EntriesService } from './entries.service';

describe('EntriesResolver', () => {
  let resolver: EntriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntriesResolver, EntriesService],
    }).compile();

    resolver = module.get<EntriesResolver>(EntriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
