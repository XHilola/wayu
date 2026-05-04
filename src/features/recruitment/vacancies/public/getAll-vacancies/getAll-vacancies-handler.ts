import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { GetAllVacanciesRequest } from './getAll-vacancies-request';
import { GetAllVacanciesResponse } from './getAll-vacancies-response';

@QueryHandler(GetAllVacanciesRequest)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesRequest> {
  async execute(query: GetAllVacanciesRequest): Promise<GetAllVacanciesResponse[]> {
    const vacancies = await Vacancies.find();
    return plainToInstance(GetAllVacanciesResponse, vacancies, { excludeExtraneousValues: true });
  }
}