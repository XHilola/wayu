import { Query } from '@nestjs/cqrs';
import { GetOneEventCategoriesResponse } from './get-one-event-categories-response';

export class GetOneEventCategoriesRequest extends Query<GetOneEventCategoriesResponse> {
  id!: number;
}
