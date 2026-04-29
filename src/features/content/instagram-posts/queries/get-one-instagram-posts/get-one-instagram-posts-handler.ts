import { GetOneInstagramPostsRequest } from './get-one-instagram-posts-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneInstagramPostsResponse } from './get-one-instagram-posts-response';
import { plainToInstance } from 'class-transformer';
import { InstagramPosts } from '../../instagramPosts.entity';

@Injectable()
@QueryHandler(GetOneInstagramPostsRequest)
export class GetOneInstagramPostsHandler implements IQueryHandler<GetOneInstagramPostsRequest> {
  async execute(req: GetOneInstagramPostsRequest): Promise<GetOneInstagramPostsResponse> {
    const post = await InstagramPosts.findOneBy({ id: req.id });
    if (!post) throw new NotFoundException('Instagram post not found');
    return plainToInstance(GetOneInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}
