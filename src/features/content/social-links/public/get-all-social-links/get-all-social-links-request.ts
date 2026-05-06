import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinksResponse } from './get-all-social-links-response';
import { GetAllSocialLinksFilter } from '../../social-links-filter';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';

export class GetAllSocialLinksRequest extends Query<PaginatedResult> {
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
