import { Command } from '@nestjs/cqrs';

export class DeleteVacanciesRequest extends Command<void> {
  id!: number;
}