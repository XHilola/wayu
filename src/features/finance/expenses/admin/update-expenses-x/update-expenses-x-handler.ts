import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { UpdateExpensesXRequest } from './update-expenses-x-request';
import { UpdateExpensesXResponse } from './update-expenses-x-response';

@Injectable()
@CommandHandler(UpdateExpensesXRequest)
export class UpdateExpensesXHandler implements ICommandHandler<UpdateExpensesXRequest> {
  async execute(cmd: UpdateExpensesXRequest): Promise<UpdateExpensesXResponse> {
    const expense = await Expenses.findOneBy({ id: cmd.id });
    if (!expense) throw new BadRequestException('Expense not found');
    expense.amount = cmd.amount;
    expense.date = cmd.date;
    expense.title = cmd.title;
    expense.description = cmd.description;
    expense.transactionId = cmd.transactionId;
    await Expenses.save(expense);
    return plainToInstance(UpdateExpensesXResponse, expense, { excludeExtraneousValues: true });
  }
}