import { Command } from '@nestjs/cqrs';

export class DeleteEventCategoriesXRequest extends Command<void> {
  id!: number;
}
