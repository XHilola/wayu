import { GetAllQuestionsXResponse } from './getAll-expenses-x-response';
import { Query } from '@nestjs/cqrs';

export class GetAllQuestionsXRequest extends Query<GetAllQuestionsXResponse[]> {}