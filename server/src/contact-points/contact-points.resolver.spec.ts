import { Test, TestingModule } from '@nestjs/testing';
import { ContactPointsResolver } from './contact-points.resolver';
import { ContactPointsService } from './contact-points.service';

describe('ContactPointsResolver', () => {
  let resolver: ContactPointsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactPointsResolver, ContactPointsService],
    }).compile();

    resolver = module.get<ContactPointsResolver>(ContactPointsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
