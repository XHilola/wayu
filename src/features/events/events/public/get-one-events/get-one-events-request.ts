import { Query } from '@nestjs/cqrs';
import { GetOneEventsResponse } from './get-one-events-response';

export class GetOneEventsRequest extends Query<GetOneEventsResponse> {
  id!: number;
}
