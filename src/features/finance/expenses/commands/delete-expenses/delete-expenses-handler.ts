import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Expenses } from '../../expenses.entity';
import { DeleteExpensesRequest } from './delete-expenses-request';

@Injectable()
@CommandHandler(DeleteExpensesRequest)
export class DeleteExpensesHandler implements ICommandHandler<DeleteExpensesRequest> {
  async execute(cmd: DeleteExpensesRequest): Promise<void> {
    const expense = await Expenses.findOneBy({ id: cmd.id });
    if (!expense) throw new NotFoundException('Expense not found');
    await Expenses.remove(expense);
  }
}