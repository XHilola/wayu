import { Query } from '@nestjs/cqrs';
import { GetOneQuestionsResponse } from './getOne-expenses-response';

export class GetOneQuestionsRequest extends Query<GetOneQuestionsResponse> {
  id!: number;
}