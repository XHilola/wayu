import { Command } from '@nestjs/cqrs';

export class DeleteNewsXRequest extends Command<void> {
  id!: number;
}