import { Query } from '@nestjs/cqrs';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllDonationsFilter } from '../../donations-filter';

export class GetAllDonationsXRequest extends Query<PaginatedResult> {
  page?: number;
  size?: number;
  fullName?: string;
  paidBy?: string;

  constructor(filter: GetAllDonationsFilter) {
    super();
    this.page = filter.page;
    this.size = filter.size;
    this.fullName = filter.fullName;
    this.paidBy = filter.paidBy;
  }
}