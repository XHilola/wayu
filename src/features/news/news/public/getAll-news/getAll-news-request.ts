import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllNewsFilter } from '../../news-filter';

export class GetAllNewsRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  categoryId?: number;
  countryId?: number;

  constructor(filter: GetAllNewsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.categoryId = filter.categoryId;
    this.countryId = filter.countryId;
  }
}