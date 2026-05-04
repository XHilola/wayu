import { Command } from '@nestjs/cqrs';

export class DeleteInstagramPostsXRequest extends Command<void> {
  id!: number;
}