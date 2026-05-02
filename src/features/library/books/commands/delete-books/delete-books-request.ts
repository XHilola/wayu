import { Command } from '@nestjs/cqrs';

export class DeleteBooksRequest extends Command<void> {
  id!: number;
}