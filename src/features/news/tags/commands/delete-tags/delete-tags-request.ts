import { Command } from '@nestjs/cqrs';

export class DeleteTagsRequest extends Command<void> {
  id!: number;
}