import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesResponse } from './getOne-vacancies-response';

export class GetOneVacanciesRequest extends Query<GetOneVacanciesResponse> {
  id!: number;
}