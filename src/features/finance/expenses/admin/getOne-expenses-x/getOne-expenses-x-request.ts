import { Query } from '@nestjs/cqrs';
import { GetOneExpensesXResponse } from './getOne-expenses-x-response';

export class GetOneExpensesXRequest extends Query<GetOneExpensesXResponse> {
  id!: number;
}