import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllInstagramPostsFilter } from '../../instagram-posts-filter';

export class GetAllInstagramPostsXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  link?: string;

  constructor(filter: GetAllInstagramPostsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.link = filter.link;
  }
}