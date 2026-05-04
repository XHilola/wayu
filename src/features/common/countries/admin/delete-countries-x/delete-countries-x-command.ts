import { Command } from '@nestjs/cqrs';

export class DeleteCountriesXCommand extends Command<void> {
  id!: number;
}