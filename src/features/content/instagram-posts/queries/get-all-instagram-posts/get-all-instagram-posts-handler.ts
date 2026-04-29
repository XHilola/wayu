import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllInstagramPostsRequest } from './get-all-instagram-posts-request';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts-response';
import { InstagramPosts } from '../../instagramPosts.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
@QueryHandler(GetAllInstagramPostsRequest)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsRequest> {
  async execute(): Promise<GetAllInstagramPostsResponse[]> {
    const posts = await InstagramPosts.find();
    return plainToInstance(GetAllInstagramPostsResponse, posts, { excludeExtraneousValues: true });
  }
}
