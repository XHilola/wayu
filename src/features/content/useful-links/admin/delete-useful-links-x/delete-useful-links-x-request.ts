import { Command } from '@nestjs/cqrs';

export class DeleteUsefulLinksXRequest extends Command<void> {
  id!: number;
}
