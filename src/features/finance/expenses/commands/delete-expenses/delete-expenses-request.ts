import { Command } from '@nestjs/cqrs';

export class DeleteExpensesRequest extends Command<void> {
  id!: number;
}