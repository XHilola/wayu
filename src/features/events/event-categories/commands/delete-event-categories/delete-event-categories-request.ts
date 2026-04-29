import { Command } from '@nestjs/cqrs';

export class DeleteEventCategoriesRequest extends Command<void> {
  id!: number;
}
