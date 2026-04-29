import { Command } from '@nestjs/cqrs';

export class DeleteSocialLinksRequest extends Command<void> {
  id!: number;
}
