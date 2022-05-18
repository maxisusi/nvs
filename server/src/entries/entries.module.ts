import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [EntriesResolver, EntriesService, PrismaService],
})
export class EntriesModule {}
