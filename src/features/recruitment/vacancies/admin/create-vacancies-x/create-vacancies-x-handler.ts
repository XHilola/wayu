import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { CreateVacanciesXRequest } from './create-vacancies-x-request';
import { CreateVacanciesXResponse } from './create-vacancies-x-response';

@CommandHandler(CreateVacanciesXRequest)
export class CreateVacanciesXHandler implements ICommandHandler<CreateVacanciesXRequest> {
  async execute(cmd: CreateVacanciesXRequest): Promise<CreateVacanciesXResponse> {
    const vacancy = Vacancies.create(cmd);
    await Vacancies.save(vacancy);
    return plainToInstance(CreateVacanciesXResponse, vacancy, { excludeExtraneousValues: true });
  }
}