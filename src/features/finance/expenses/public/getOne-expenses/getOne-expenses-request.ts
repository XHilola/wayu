import { Query } from '@nestjs/cqrs';
import { GetOneExpensesResponse } from './getOne-expenses-response';

export class GetOneExpensesRequest extends Query<GetOneExpensesResponse> {
  id!: number;
}