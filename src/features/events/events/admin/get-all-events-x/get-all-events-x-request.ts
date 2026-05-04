import { Query } from '@nestjs/cqrs';
import { GetAllEventsXResponse } from './get-all-events-x-response';

export class GetAllEventsXRequest extends Query<GetAllEventsXResponse[]> {}