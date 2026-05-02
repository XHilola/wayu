import { Command } from '@nestjs/cqrs';

export class DeleteCountriesCommand extends Command<void> {
  id!: number;
}