import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { GetOneExpensesRequest } from './getOne-expenses-request';
import { GetOneExpensesResponse } from './getOne-expenses-response';

@Injectable()
@QueryHandler(GetOneExpensesRequest)
export class GetOneExpensesHandler implements IQueryHandler<GetOneExpensesRequest> {
  async execute(query: GetOneExpensesRequest): Promise<GetOneExpensesResponse> {
    const expense = await Expenses.findOneBy({ id: query.id });
    if (!expense) throw new NotFoundException('Expense not found');
    return plainToInstance(GetOneExpensesResponse, expense, { excludeExtraneousValues: true });
  }
}