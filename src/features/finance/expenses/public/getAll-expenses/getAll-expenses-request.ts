import { Query } from '@nestjs/cqrs';
import { GetAllExpensesResponse } from './getAll-expenses-response';

export class GetAllExpensesRequest extends Query<GetAllExpensesResponse[]> {}