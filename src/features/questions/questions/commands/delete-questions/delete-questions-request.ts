import { Command } from '@nestjs/cqrs';

export class DeleteQuestionsRequest extends Command<void> {
  id!: number;
}