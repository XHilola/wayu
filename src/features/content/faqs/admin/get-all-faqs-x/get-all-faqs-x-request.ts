import { Query } from '@nestjs/cqrs';
import { GetAllFaqsXResponse } from './get-all-faqs-x-response';

export class GetAllFaqsXRequest extends Query<GetAllFaqsXResponse[]> {}
