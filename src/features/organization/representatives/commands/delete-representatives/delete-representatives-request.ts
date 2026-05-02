import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativesRequest extends Command<void> {
  id!: number;
}