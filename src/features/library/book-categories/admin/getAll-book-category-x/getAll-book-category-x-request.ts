import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllBookCategoriesFilter } from '../../book-categories-filter';

export class GetAllBookCategoryXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;

  constructor(filter: GetAllBookCategoriesFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
  }
}