import { Command } from '@nestjs/cqrs';

export class DeleteLanguagesXRequest extends Command<void> {
  id!: number;
}
