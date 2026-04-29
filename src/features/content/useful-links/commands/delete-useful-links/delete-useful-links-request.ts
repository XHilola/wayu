import { Command } from '@nestjs/cqrs';

export class DeleteUsefulLinksRequest extends Command<void> {
  id!: number;
}
