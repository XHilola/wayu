import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Vacancies } from '../../vacancies.entity';
import { UpdateVacanciesRequest } from './update-vacancies-request';
import { UpdateVacanciesResponse } from './update-vacancies-response';

@CommandHandler(UpdateVacanciesRequest)
export class UpdateVacanciesHandler implements ICommandHandler<UpdateVacanciesRequest> {
  async execute(cmd: UpdateVacanciesRequest): Promise<UpdateVacanciesResponse> {
    const vacancy = await Vacancies.findOneBy({ id: cmd.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    if (cmd.title)       vacancy.title       = cmd.title;
    if (cmd.address)     vacancy.address     = cmd.address;
    if (cmd.description) vacancy.description = cmd.description;
    if (cmd.phoneNumber) vacancy.phoneNumber = cmd.phoneNumber;
    if (cmd.type)        vacancy.type        = cmd.type;
    if (cmd.salary)      vacancy.salary      = cmd.salary;
    if (cmd.isActive !== undefined) vacancy.isActive = cmd.isActive;
    await Vacancies.save(vacancy);
    return plainToInstance(UpdateVacanciesResponse, vacancy, { excludeExtraneousValues: true });
  }
}