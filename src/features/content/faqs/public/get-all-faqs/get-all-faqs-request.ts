import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllFaqsFilter } from '../../faqs-filter';

export class GetAllFaqsRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  question?: string;

  constructor(filter: GetAllFaqsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.question = filter.question;
  }
}