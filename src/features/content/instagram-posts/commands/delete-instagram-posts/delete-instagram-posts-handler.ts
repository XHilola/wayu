import { DeleteInstagramPostsRequest } from './delete-instagram-posts-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InstagramPosts } from '../../instagramPosts.entity';

@Injectable()
@CommandHandler(DeleteInstagramPostsRequest)
export class DeleteInstagramPostsHandler implements ICommandHandler<DeleteInstagramPostsRequest> {
  async execute(req: DeleteInstagramPostsRequest): Promise<void> {
    const post = await InstagramPosts.findOneBy({ id: req.id });
    if (!post) throw new NotFoundException('Instagram post not found');
    await InstagramPosts.remove(post);
  }
}
