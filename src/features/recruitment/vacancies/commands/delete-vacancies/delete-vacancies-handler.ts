import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vacancies } from '../../vacancies.entity';
import { DeleteVacanciesRequest } from './delete-vacancies-request';

@CommandHandler(DeleteVacanciesRequest)
export class DeleteVacanciesHandler implements ICommandHandler<DeleteVacanciesRequest> {
  async execute(cmd: DeleteVacanciesRequest): Promise<void> {
    const vacancy = await Vacancies.findOneBy({ id: cmd.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    await Vacancies.remove(vacancy);
  }
}