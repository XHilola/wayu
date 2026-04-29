import { CreateInstagramPostsRequest } from './create-instagram-posts-request';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInstagramPostsResponse } from './create-instagram-posts-response';
import { plainToInstance } from 'class-transformer';
import { InstagramPosts } from '../../instagramPosts.entity';

@Injectable()
@CommandHandler(CreateInstagramPostsRequest)
export class CreateInstagramPostsHandler implements ICommandHandler<CreateInstagramPostsRequest> {
  async execute(req: CreateInstagramPostsRequest): Promise<CreateInstagramPostsResponse> {
    const post = InstagramPosts.create({ image: req.image, link: req.link });
    await InstagramPosts.save(post);
    return plainToInstance(CreateInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}
