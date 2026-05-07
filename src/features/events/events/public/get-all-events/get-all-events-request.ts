import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllEventsFilter } from '../../events-filter';

export class GetAllEventsRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  address?: string;
  categoryId?: number;

  constructor(filter: GetAllEventsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.address = filter.address;
    this.categoryId = filter.categoryId;
  }
}