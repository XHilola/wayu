import { Command } from '@nestjs/cqrs';
import { UpdateInstagramPostsXResponse } from './update-instagram-posts-x-response';

export class UpdateInstagramPostsXCommand extends Command<UpdateInstagramPostsXResponse> {
  constructor(
    public id: number,
    public link?: string,
    public image?: Express.Multer.File,
  ) {
    super();
  }
}