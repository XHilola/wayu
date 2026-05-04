import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesResponse } from './getAll-vacancies-response';

export class GetAllVacanciesRequest extends Query<GetAllVacanciesResponse[]> {}