import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllEventCategoriesFilter } from '../../event-categories-filter';

export class GetAllEventCategoriesRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;

  constructor(filter: GetAllEventCategoriesFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
  }
}