import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Expenses } from '../../expenses.entity';
import { DeleteExpensesXRequest } from './delete-expenses-x-request';

@Injectable()
@CommandHandler(DeleteExpensesXRequest)
export class DeleteExpensesXHandler implements ICommandHandler<DeleteExpensesXRequest> {
  async execute(cmd: DeleteExpensesXRequest): Promise<void> {
    const expense = await Expenses.findOneBy({ id: cmd.id });
    if (!expense) throw new NotFoundException('Expense not found');
    await Expenses.remove(expense);
  }
}