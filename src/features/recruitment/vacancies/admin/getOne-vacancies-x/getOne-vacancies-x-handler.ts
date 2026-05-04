import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { GetOneVacanciesXRequest } from './getOne-vacancies-x-request';
import { GetOneVacanciesXResponse } from './getOne-vacancies-x-response';

@QueryHandler(GetOneVacanciesXRequest)
export class GetOneVacanciesXHandler implements IQueryHandler<GetOneVacanciesXRequest> {
  async execute(query: GetOneVacanciesXRequest): Promise<GetOneVacanciesXResponse> {
    const vacancy = await Vacancies.findOneBy({ id: query.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return plainToInstance(GetOneVacanciesXResponse, vacancy, { excludeExtraneousValues: true });
  }
}