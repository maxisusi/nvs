import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EntriesService } from './entries.service';
import { UpdateEntryInput } from './dto/update-entry.input';
import { CreateEntryInput } from 'src/graphql';

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
  findOne(@Args('id') id: string) {
    return this.entriesService.findOne(id);
  }

  @Mutation('updateEntry')
  update(@Args('updateEntryInput') updateEntryInput: UpdateEntryInput) {
    return this.entriesService.update(updateEntryInput.id, updateEntryInput);
  }

  @Mutation('removeEntry')
  remove(@Args('id') id: string) {
    return this.entriesService.remove(id);
  }
}
