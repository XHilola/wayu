import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesResponse } from './get-all-event-categories-response';

export class GetAllEventCategoriesRequest extends Query<GetAllEventCategoriesResponse[]> {}
