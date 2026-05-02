import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { UpdateExpensesRequest } from './update-expenses-request';
import { UpdateExpensesResponse } from './update-expenses-response';

@Injectable()
@CommandHandler(UpdateExpensesRequest)
export class UpdateExpensesHandler implements ICommandHandler<UpdateExpensesRequest> {
  async execute(cmd: UpdateExpensesRequest): Promise<UpdateExpensesResponse> {
    const expense = await Expenses.findOneBy({ id: cmd.id });
    if (!expense) throw new BadRequestException('Expense not found');
    expense.amount = cmd.amount;
    expense.date = cmd.date;
    expense.title = cmd.title;
    expense.description = cmd.description;
    expense.transactionId = cmd.transactionId;
    await Expenses.save(expense);
    return plainToInstance(UpdateExpensesResponse, expense, { excludeExtraneousValues: true });
  }
}