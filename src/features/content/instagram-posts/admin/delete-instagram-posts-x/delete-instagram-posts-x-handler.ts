import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { InstagramPosts } from '../../instagramPosts.entity';
import { DeleteInstagramPostsXRequest } from './delete-instagram-posts-x-request';

@CommandHandler(DeleteInstagramPostsXRequest)
export class DeleteInstagramPostsXHandler implements ICommandHandler<DeleteInstagramPostsXRequest> {
  async execute(cmd: DeleteInstagramPostsXRequest): Promise<void> {
    const post = await InstagramPosts.findOneBy({ id: cmd.id });
    if (!post)
      throw new NotFoundException('Instagram post not found');
    if (post.image && fs.existsSync(post.image))
      fs.rmSync(post.image);
    await InstagramPosts.remove(post);
  }
}