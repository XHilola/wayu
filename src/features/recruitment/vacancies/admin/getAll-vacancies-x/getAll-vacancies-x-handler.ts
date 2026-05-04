import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { GetAllVacanciesXRequest } from './getAll-vacancies-x-request';
import { GetAllVacanciesXResponse } from './getAll-vacancies-x-response';

@QueryHandler(GetAllVacanciesXRequest)
export class GetAllVacanciesXHandler implements IQueryHandler<GetAllVacanciesXRequest> {
  async execute(query: GetAllVacanciesXRequest): Promise<GetAllVacanciesXResponse[]> {
    const vacancies = await Vacancies.find();
    return plainToInstance(GetAllVacanciesXResponse, vacancies, { excludeExtraneousValues: true });
  }
}