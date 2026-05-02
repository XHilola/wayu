import { Command } from '@nestjs/cqrs';

export class DeleteNewsRequest extends Command<void> {
  id!: number;
}