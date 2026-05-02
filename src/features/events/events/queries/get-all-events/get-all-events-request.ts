import { Query } from '@nestjs/cqrs';
import { GetAllEventsResponse } from './get-all-events-response';

export class GetAllEventsRequest extends Query<GetAllEventsResponse[]> {}