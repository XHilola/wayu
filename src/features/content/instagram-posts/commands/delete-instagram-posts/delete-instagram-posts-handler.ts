import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { InstagramPosts } from '../../instagramPosts.entity';
import { DeleteInstagramPostsRequest } from './delete-instagram-posts-request';

@CommandHandler(DeleteInstagramPostsRequest)
export class DeleteInstagramPostsHandler implements ICommandHandler<DeleteInstagramPostsRequest> {
  async execute(cmd: DeleteInstagramPostsRequest): Promise<void> {
    const post = await InstagramPosts.findOneBy({ id: cmd.id });
    if (!post)
      throw new NotFoundException('Instagram post not found');
    if (post.image && fs.existsSync(post.image))
      fs.rmSync(post.image);
    await InstagramPosts.remove(post);
  }
}