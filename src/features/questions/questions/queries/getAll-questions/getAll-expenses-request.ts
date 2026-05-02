import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsResponse } from './getAll-expenses-response';

export class GetAllQuestionsRequest extends Query<GetAllQuestionsResponse[]> {}