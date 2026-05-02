import { Command } from '@nestjs/cqrs';

export class DeleteInstagramPostsRequest extends Command<void> {
  id!: number;
}