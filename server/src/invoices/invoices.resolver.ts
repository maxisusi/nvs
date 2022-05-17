import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvoicesService } from './invoices.service';

import { UpdateInvoiceInput } from './dto/update-invoice.input';
import { Prisma } from '@prisma/client';
import { CreateInvoiceInput } from 'src/graphql';

@Resolver('Invoice')
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Mutation('createInvoice')
  create(
    @Args('createInvoiceInput')
    createInvoiceInput: Prisma.InvoiceUncheckedCreateInput,
  ) {
    return this.invoicesService.create(createInvoiceInput);
  }

  @Query('invoices')
  findAll() {
    return this.invoicesService.findAll();
  }

  @Query('invoice')
  findOne(@Args('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Mutation('updateInvoice')
  update(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
    return this.invoicesService.update(
      updateInvoiceInput.id,
      updateInvoiceInput,
    );
  }

  @Mutation('removeInvoice')
  remove(@Args('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
