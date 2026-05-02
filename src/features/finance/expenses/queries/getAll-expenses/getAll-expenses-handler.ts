import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { GetAllExpensesRequest } from './getAll-expenses-request';
import { GetAllExpensesResponse } from './getAll-expenses-response';

@Injectable()
@QueryHandler(GetAllExpensesRequest)
export class GetAllExpensesHandler implements IQueryHandler<GetAllExpensesRequest> {
  async execute(query: GetAllExpensesRequest): Promise<GetAllExpensesResponse[]> {
    const expenses = await Expenses.find();
    return plainToInstance(GetAllExpensesResponse, expenses, { excludeExtraneousValues: true });
  }
}