import { Command } from '@nestjs/cqrs';

export class DeleteLanguagesRequest extends Command<void> {
  id!: number;
}
