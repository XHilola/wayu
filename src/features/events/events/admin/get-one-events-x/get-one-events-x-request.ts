import { Query } from '@nestjs/cqrs';
import { GetOneEventsXResponse } from './get-one-events-x-response';

export class GetOneEventsXRequest extends Query<GetOneEventsXResponse> {
  id!: number;
}
