import { Command } from '@nestjs/cqrs';

export class DeleteEventsXRequest extends Command<void> {
  id!: number;
}
