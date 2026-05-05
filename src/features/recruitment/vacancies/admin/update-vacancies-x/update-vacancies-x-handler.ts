import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { UpdateVacanciesXRequest } from './update-vacancies-x-request';
import { UpdateVacanciesXResponse } from './update-vacancies-x-response';

@CommandHandler(UpdateVacanciesXRequest)
export class UpdateVacanciesXHandler implements ICommandHandler<UpdateVacanciesXRequest> {
  async execute(cmd: UpdateVacanciesXRequest): Promise<UpdateVacanciesXResponse> {
    const vacancy = await Vacancies.findOneBy({ id: cmd.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    if (cmd.title)
      vacancy.title       = cmd.title;
    if (cmd.address)
      vacancy.address     = cmd.address;
    if (cmd.description)
      vacancy.description = cmd.description;
    if (cmd.phoneNumber)
      vacancy.phoneNumber = cmd.phoneNumber;
    if (cmd.type)
      vacancy.type        = cmd.type;
    if (cmd.salary)
      vacancy.salary      = cmd.salary;
    if (cmd.isActive !== undefined)
      vacancy.isActive = cmd.isActive;
    await Vacancies.save(vacancy);
    return plainToInstance(UpdateVacanciesXResponse, vacancy, { excludeExtraneousValues: true });
  }
}