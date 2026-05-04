import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { GetOneExpensesXRequest } from './getOne-expenses-x-request';
import { GetOneExpensesXResponse } from './getOne-expenses-x-response';

@Injectable()
@QueryHandler(GetOneExpensesXRequest)
export class GetOneExpensesXHandler implements IQueryHandler<GetOneExpensesXRequest> {
  async execute(query: GetOneExpensesXRequest): Promise<GetOneExpensesXResponse> {
    const expense = await Expenses.findOneBy({ id: query.id });
    if (!expense) throw new NotFoundException('Expense not found');
    return plainToInstance(GetOneExpensesXResponse, expense, { excludeExtraneousValues: true });
  }
}