import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllSocialLinksFilter } from '../../social-links-filter';

export class GetAllSocialLinksXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  link?: string;

  constructor(filter: GetAllSocialLinksFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.link = filter.link;
  }
}