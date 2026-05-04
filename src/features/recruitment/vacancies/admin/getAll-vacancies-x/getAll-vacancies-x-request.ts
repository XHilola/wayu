import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesXResponse } from './getAll-vacancies-x-response';

export class GetAllVacanciesXRequest extends Query<GetAllVacanciesXResponse[]> {}