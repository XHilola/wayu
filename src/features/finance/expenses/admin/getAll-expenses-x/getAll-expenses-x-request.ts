import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllExpensesFilter } from '../../expenses.filter';
import { Query } from '@nestjs/cqrs';


export class GetAllExpensesXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  description?: string;
  transactionId?: string;

  constructor(filter: GetAllExpensesFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.description = filter.description;
    this.transactionId = filter.transactionId;
  }
}