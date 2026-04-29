import { UpdateInstagramPostsRequest } from './update-instagram-posts-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInstagramPostsResponse } from './update-instagram-posts-response';
import { plainToInstance } from 'class-transformer';
import { InstagramPosts } from '../../instagramPosts.entity';

@Injectable()
@CommandHandler(UpdateInstagramPostsRequest)
export class UpdateInstagramPostsHandler implements ICommandHandler<UpdateInstagramPostsRequest> {
  async execute(req: UpdateInstagramPostsRequest): Promise<UpdateInstagramPostsResponse> {
    const post = await InstagramPosts.findOneBy({ id: req.id });
    if (!post) throw new NotFoundException('Instagram post not found');

    if (req.image !== undefined) post.image = req.image;
    if (req.link !== undefined) post.link = req.link;

    await InstagramPosts.save(post);
    return plainToInstance(UpdateInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}
