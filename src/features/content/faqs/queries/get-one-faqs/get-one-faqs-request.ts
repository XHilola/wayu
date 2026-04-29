import { Query } from '@nestjs/cqrs';
import { GetOneFaqsResponse } from './get-one-faqs-response';

export class GetOneFaqsRequest extends Query<GetOneFaqsResponse> {
  id!: number;
}
