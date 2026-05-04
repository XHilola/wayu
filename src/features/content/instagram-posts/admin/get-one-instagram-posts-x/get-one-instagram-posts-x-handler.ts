import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPosts } from '../../instagramPosts.entity';
import { GetOneInstagramPostsXRequest } from './get-one-instagram-posts-x-request';
import { GetOneInstagramPostsXResponse } from './get-one-instagram-posts-x-response';

@QueryHandler(GetOneInstagramPostsXRequest)
export class GetOneInstagramPostsXHandler implements IQueryHandler<GetOneInstagramPostsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneInstagramPostsXRequest): Promise<GetOneInstagramPostsXResponse> {
    const post = await InstagramPosts.findOneBy({ id: query.id });
    if (!post)
      throw new NotFoundException('Instagram post not found');
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const res = plainToInstance(GetOneInstagramPostsXResponse, post, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${post.image}`;
    return res;
  }
}