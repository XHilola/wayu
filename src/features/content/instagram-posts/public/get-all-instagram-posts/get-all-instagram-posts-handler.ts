import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPosts } from '../../instagramPosts.entity';
import { GetAllInstagramPostsRequest } from './get-all-instagram-posts-request';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts-response';

@QueryHandler(GetAllInstagramPostsRequest)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllInstagramPostsRequest): Promise<GetAllInstagramPostsResponse[]> {
    const posts = await InstagramPosts.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return posts.map((post) => {
      const res = plainToInstance(GetAllInstagramPostsResponse, post, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${post.image}`;
      return res;
    });
  }
}