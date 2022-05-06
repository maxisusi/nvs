import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactPointsService } from './contact-points.service';
import { CreateContactPointInput } from './dto/create-contact-point.input';
import { UpdateContactPointInput } from './dto/update-contact-point.input';

@Resolver('ContactPoint')
export class ContactPointsResolver {
  constructor(private readonly contactPointsService: ContactPointsService) {}

  @Mutation('createContactPoint')
  create(
    @Args('createContactPointInput')
    createContactPointInput: CreateContactPointInput,
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
    updateContactPointInput: UpdateContactPointInput,
  ) {
    return this.contactPointsService.update(
      updateContactPointInput.id,
      updateContactPointInput,
    );
  }

  @Mutation('removeContactPoint')
  remove(@Args('id') id: number) {
    return this.contactPointsService.remove(id);
  }
}
