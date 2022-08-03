import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { InvoicesService } from './invoices.service';

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

  @Query('sumAllInvoices')
  getSum() {
    return this.invoicesService.getSum();
  }

  @Query('getPendingInvoicesStream')
  getPendingInvoice() {
    return this.invoicesService.getPendingInvoiceStream();
  }

  @Query('getNetInvoicesStream')
  getNetInvoicesStream() {
    return this.invoicesService.getNetInvoicesStream();
  }

  @Query('invoice')
  findOne(@Args('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Query('invoiceCount')
  getCount() {
    return this.invoicesService.getInvoiceCount();
  }

  @Mutation('updateInvoice')
  update(
    @Args('updateInvoiceInput')
    updateInvoiceInput: Prisma.InvoiceUncheckedUpdateInput,
  ) {
    return this.invoicesService.update(updateInvoiceInput);
  }

  @Mutation('removeInvoice')
  remove(@Args('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
