import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Vacancies } from '../../vacancies.entity';
import { DeleteVacanciesXRequest } from './delete-vacancies-x-request';

@CommandHandler(DeleteVacanciesXRequest)
export class DeleteVacanciesXHandler implements ICommandHandler<DeleteVacanciesXRequest> {
  async execute(cmd: DeleteVacanciesXRequest): Promise<void> {
    const vacancy = await Vacancies.findOneBy({ id: cmd.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    await Vacancies.remove(vacancy);
  }
}