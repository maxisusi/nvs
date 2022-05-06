import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ContactPointCreateInput } from 'src/@generated/prisma-nestjs-graphql/contact-point/contact-point-create.input';
import { ContactPointsService } from './contact-points.service';

@Resolver('ContactPoint')
export class ContactPointsResolver {
  constructor(private readonly contactPointsService: ContactPointsService) {}

  @Mutation('createContactPoint')
  create(
    @Args('createContactPointInput')
    createContactPointInput: ContactPointCreateInput,
  ) {
    return this.contactPointsService.create(createContactPointInput);
  }

  @Query('contactPoints')
  findAll() {
    return this.contactPointsService.findAll();
  }

  @Query('contactPoint')
  findOne(@Args('id') id: string) {
    return this.contactPointsService.findOne(id);
  }

  @Mutation('updateContactPoint')
  update(
    @Args('updateContactPointInput')
    updateContactPointInput: Prisma.ContactPointUpdateInput,
  ) {
    return this.contactPointsService.update(updateContactPointInput);
  }

  @Mutation('removeContactPoint')
  remove(@Args('id') id: string) {
    return this.contactPointsService.remove(id);
  }
}
