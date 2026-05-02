import { Command } from '@nestjs/cqrs';
import { CreateInstagramPostsResponse } from './create-instagram-posts-response';

export class CreateInstagramPostsCommand extends Command<CreateInstagramPostsResponse> {
  constructor(
    public image: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}