import { Query } from '@nestjs/cqrs';
import { GetAllFaqsResponse } from './get-all-faqs-response';

export class GetAllFaqsRequest extends Query<GetAllFaqsResponse[]> {}
