import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { GetOneVacanciesRequest } from './getOne-vacancies-request';
import { GetOneVacanciesResponse } from './getOne-vacancies-response';

@QueryHandler(GetOneVacanciesRequest)
export class GetOneVacanciesHandler implements IQueryHandler<GetOneVacanciesRequest> {
  async execute(query: GetOneVacanciesRequest): Promise<GetOneVacanciesResponse> {
    const vacancy = await Vacancies.findOneBy({ id: query.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return plainToInstance(GetOneVacanciesResponse, vacancy, { excludeExtraneousValues: true });
  }
}