import { Command } from '@nestjs/cqrs';
import { CreateInstagramPostsXResponse } from './create-instagram-posts-x-response';

export class CreateInstagramPostsXCommand extends Command<CreateInstagramPostsXResponse> {
  constructor(
    public image: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}