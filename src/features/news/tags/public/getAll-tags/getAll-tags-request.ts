import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllTagsFilter } from '../../tags.filter';

export class GetAllTagsRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;

  constructor(filter: GetAllTagsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
  }
}