import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllUsefulLinksFilter } from '../../useful-links-filter';

export class GetAllUsefulLinksXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  link?: string;

  constructor(filter: GetAllUsefulLinksFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.link = filter.link;
  }
}