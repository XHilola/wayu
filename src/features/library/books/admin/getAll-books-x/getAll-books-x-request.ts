import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllBooksFilter } from '../../books-filter';

export class GetAllBooksXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  title?: string;
  authorId?: number;
  categoryId?: number;
  year?: number;

  constructor(filter: GetAllBooksFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.title = filter.title;
    this.authorId = filter.authorId;
    this.categoryId = filter.categoryId;
    this.year = filter.year;
  }
}