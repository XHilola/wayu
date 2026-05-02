import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { CreateExpensesRequest } from './create-expenses-request';
import { CreateExpensesResponse } from './create-expenses-response';

@Injectable()
@CommandHandler(CreateExpensesRequest)
export class CreateExpensesHandler implements ICommandHandler<CreateExpensesRequest> {
  async execute(cmd: CreateExpensesRequest): Promise<CreateExpensesResponse> {
    const existing = await Expenses.findOneBy({ transactionId: cmd.transactionId });
    if (existing) throw new BadRequestException('Expense with this transactionId already exists');
    const expense = Expenses.create(cmd);
    await Expenses.save(expense);
    return plainToInstance(CreateExpensesResponse, expense, { excludeExtraneousValues: true });
  }
}