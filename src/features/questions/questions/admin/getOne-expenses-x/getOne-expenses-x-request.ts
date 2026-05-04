import { Query } from '@nestjs/cqrs';
import { GetOneQuestionsXResponse } from './getOne-expenses-x-response';


export class GetOneQuestionsXRequest extends Query<GetOneQuestionsXResponse> {
  id!: number;
}