import { Command } from '@nestjs/cqrs';

export class DeleteFaqsRequest extends Command<void> {
  id!: number;
}
