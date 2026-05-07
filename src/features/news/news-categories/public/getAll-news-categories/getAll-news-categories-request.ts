import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllNewsCategoriesFilter } from '../../news-categories-filter';

export class GetAllNewsCategoriesRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;

  constructor(filter: GetAllNewsCategoriesFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
  }
}