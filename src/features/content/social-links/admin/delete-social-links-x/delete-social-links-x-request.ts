import { Command } from '@nestjs/cqrs';

export class DeleteSocialLinksXRequest extends Command<void> {
  id!: number;
}
