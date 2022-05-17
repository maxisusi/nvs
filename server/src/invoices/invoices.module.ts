import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [InvoicesResolver, InvoicesService, PrismaService],
})
export class InvoicesModule {}
