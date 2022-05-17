import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EntriesService } from './entries.service';
import { CreateEntryInput } from './dto/create-entry.input';
import { UpdateEntryInput } from './dto/update-entry.input';

@Resolver('Entry')
export class EntriesResolver {
  constructor(private readonly entriesService: EntriesService) {}

  @Mutation('createEntry')
  create(@Args('createEntryInput') createEntryInput: CreateEntryInput) {
    return this.entriesService.create(createEntryInput);
  }

  @Query('entries')
  findAll() {
    return this.entriesService.findAll();
  }

  @Query('entry')
  findOne(@Args('id') id: number) {
    return this.entriesService.findOne(id);
  }

  @Mutation('updateEntry')
  update(@Args('updateEntryInput') updateEntryInput: UpdateEntryInput) {
    return this.entriesService.update(updateEntryInput.id, updateEntryInput);
  }

  @Mutation('removeEntry')
  remove(@Args('id') id: number) {
    return this.entriesService.remove(id);
  }
}
