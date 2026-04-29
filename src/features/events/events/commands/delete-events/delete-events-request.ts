import { Command } from '@nestjs/cqrs';

export class DeleteEventsRequest extends Command<void> {
  id!: number;
}
