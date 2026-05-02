import { Command } from '@nestjs/cqrs';

export class DeleteNewsCategoriesRequest extends Command<void> {
  id!: number;
}