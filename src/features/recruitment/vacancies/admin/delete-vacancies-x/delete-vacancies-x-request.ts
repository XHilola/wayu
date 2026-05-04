import { Command } from '@nestjs/cqrs';

export class DeleteVacanciesXRequest extends Command<void> {
  id!: number;
}