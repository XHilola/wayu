import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesXResponse } from './get-all-event-categories-x-response';

export class GetAllEventCategoriesXRequest extends Query<GetAllEventCategoriesXResponse[]> {}
