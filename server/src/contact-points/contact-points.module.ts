import { Module } from '@nestjs/common';
import { ContactPointsService } from './contact-points.service';
import { ContactPointsResolver } from './contact-points.resolver';

@Module({
  providers: [ContactPointsResolver, ContactPointsService]
})
export class ContactPointsModule {}
