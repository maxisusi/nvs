import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [PrismaService, CustomersResolver, CustomersService],
})
export class CustomersModule {}
