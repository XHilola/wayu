import { Command } from '@nestjs/cqrs';

export class DeleteBooksXRequest extends Command<void> {
  id!: number;
}