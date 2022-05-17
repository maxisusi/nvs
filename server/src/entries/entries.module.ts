import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';

@Module({
  providers: [EntriesResolver, EntriesService]
})
export class EntriesModule {}
