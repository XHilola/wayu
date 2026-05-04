import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { GetAllExpensesXRequest } from './getAll-expenses-x-request';
import { GetAllExpensesXResponse } from './getAll-expenses-x-response';

@Injectable()
@QueryHandler(GetAllExpensesXRequest)
export class GetAllExpensesXHandler implements IQueryHandler<GetAllExpensesXRequest> {
  async execute(query: GetAllExpensesXRequest): Promise<GetAllExpensesXResponse[]> {
    const expenses = await Expenses.find();
    return plainToInstance(GetAllExpensesXResponse, expenses, { excludeExtraneousValues: true });
  }
}