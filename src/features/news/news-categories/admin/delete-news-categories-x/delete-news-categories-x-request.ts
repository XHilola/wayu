import { Command } from '@nestjs/cqrs';

export class DeleteNewsCategoriesXRequest extends Command<void> {
  id!: number;
}