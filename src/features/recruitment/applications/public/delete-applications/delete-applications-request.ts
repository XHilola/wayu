import { Command } from '@nestjs/cqrs';

export class DeleteApplicationsRequest extends Command<void> {
  id!: number;
}