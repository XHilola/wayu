import { Query } from '@nestjs/cqrs';
import { GetAllExpensesXResponse } from './getAll-expenses-x-response';

export class GetAllExpensesXRequest extends Query<GetAllExpensesXResponse[]> {}