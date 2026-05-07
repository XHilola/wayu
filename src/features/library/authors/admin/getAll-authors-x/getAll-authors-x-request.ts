import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllAuthorsFilter } from '../../authors-filter';

export class GetAllAuthorsXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  fullName?: string;

  constructor(filter: GetAllAuthorsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.fullName = filter.fullName;
  }
}