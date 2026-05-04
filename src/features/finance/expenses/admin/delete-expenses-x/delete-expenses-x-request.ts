import { Command } from '@nestjs/cqrs';

export class DeleteExpensesXRequest extends Command<void> {
  id!: number;
}