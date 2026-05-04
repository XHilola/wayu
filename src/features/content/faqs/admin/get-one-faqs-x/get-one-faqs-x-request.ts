import { Query } from '@nestjs/cqrs';
import { GetOneFaqsXResponse } from './get-one-faqs-x-response';

export class GetOneFaqsXRequest extends Query<GetOneFaqsXResponse> {
  id!: number;
}
