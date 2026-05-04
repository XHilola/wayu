import { Command } from '@nestjs/cqrs';

export class DeleteBranchesXRequest extends Command<void> {
  id!: number;
}