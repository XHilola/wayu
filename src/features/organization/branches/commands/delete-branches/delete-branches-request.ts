import { Command } from '@nestjs/cqrs';

export class DeleteBranchesRequest extends Command<void> {
  id!: number;
}