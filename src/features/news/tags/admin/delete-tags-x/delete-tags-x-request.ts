import { Command } from '@nestjs/cqrs';

export class DeleteTagsXRequest extends Command<void> {
  id!: number;
}