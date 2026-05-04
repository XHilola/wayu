import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesXResponse } from './getOne-vacancies-x-response';

export class GetOneVacanciesXRequest extends Query<GetOneVacanciesXResponse> {
  id!: number;
}