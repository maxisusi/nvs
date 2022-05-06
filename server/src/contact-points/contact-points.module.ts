import { Module } from '@nestjs/common';
import { ContactPointsService } from './contact-points.service';
import { ContactPointsResolver } from './contact-points.resolver';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [ContactPointsResolver, ContactPointsService, PrismaService],
})
export class ContactPointsModule {}
