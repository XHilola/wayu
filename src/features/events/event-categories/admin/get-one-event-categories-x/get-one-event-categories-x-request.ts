import { Query } from '@nestjs/cqrs';
import { GetOneEventCategoriesXResponse } from './get-one-event-categories-x-response';

export class GetOneEventCategoriesXRequest extends Query<GetOneEventCategoriesXResponse> {
  id!: number;
}
