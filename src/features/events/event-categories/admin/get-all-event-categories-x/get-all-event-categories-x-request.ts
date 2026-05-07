import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesXResponse } from './get-all-event-categories-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { GetAllEventCategoriesFilter } from '../../event-categories-filter';

export class GetAllEventCategoriesXRequest extends Query<PaginatedResult> {
  page?:number
  size?:number
  title?:string

  constructor(filter:GetAllEventCategoriesFilter ) {
    super();
    this.page=filter.page
    this.size=filter.size
    this.title=filter.title
  }
}
