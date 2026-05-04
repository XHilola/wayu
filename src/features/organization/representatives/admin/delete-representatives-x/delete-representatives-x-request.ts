import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativesXRequest extends Command<void> {
  id!: number;
}