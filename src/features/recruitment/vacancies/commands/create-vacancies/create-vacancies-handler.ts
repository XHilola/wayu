import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { CreateVacanciesRequest } from './create-vacancies-request';
import { CreateVacanciesResponse } from './create-vacancies-response';

@CommandHandler(CreateVacanciesRequest)
export class CreateVacanciesHandler implements ICommandHandler<CreateVacanciesRequest> {
  async execute(cmd: CreateVacanciesRequest): Promise<CreateVacanciesResponse> {
    const vacancy = Vacancies.create(cmd);
    await Vacancies.save(vacancy);
    return plainToInstance(CreateVacanciesResponse, vacancy, { excludeExtraneousValues: true });
  }
}