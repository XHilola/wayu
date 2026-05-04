import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPosts } from '../../instagramPosts.entity';
import { GetOneInstagramPostsRequest } from './get-one-instagram-posts-request';
import { GetOneInstagramPostsResponse } from './get-one-instagram-posts-response';

@QueryHandler(GetOneInstagramPostsRequest)
export class GetOneInstagramPostsHandler implements IQueryHandler<GetOneInstagramPostsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneInstagramPostsRequest): Promise<GetOneInstagramPostsResponse> {
    const post = await InstagramPosts.findOneBy({ id: query.id });
    if (!post)
      throw new NotFoundException('Instagram post not found');
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const res = plainToInstance(GetOneInstagramPostsResponse, post, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${post.image}`;
    return res;
  }
}