import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { CreateExpensesXRequest } from './create-expenses-x-request';
import { CreateExpensesXResponse } from './create-expenses-x-response';

@Injectable()
@CommandHandler(CreateExpensesXRequest)
export class CreateExpensesXHandler implements ICommandHandler<CreateExpensesXRequest> {
  async execute(cmd: CreateExpensesXRequest): Promise<CreateExpensesXResponse> {
    const existing = await Expenses.findOneBy({ transactionId: cmd.transactionId });
    if (existing) throw new BadRequestException('Expense with this transactionId already exists');
    const expense = Expenses.create(cmd);
    await Expenses.save(expense);
    return plainToInstance(CreateExpensesXResponse, expense, { excludeExtraneousValues: true });
  }
}