import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPosts } from '../../instagramPosts.entity';
import { GetAllInstagramPostsXRequest } from './get-all-instagram-posts-x-request';
import { GetAllInstagramPostsXResponse } from './get-all-instagram-posts-x-response';

@QueryHandler(GetAllInstagramPostsXRequest)
export class GetAllInstagramPostsXHandler implements IQueryHandler<GetAllInstagramPostsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllInstagramPostsXRequest): Promise<GetAllInstagramPostsXResponse[]> {
    const posts = await InstagramPosts.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return posts.map((post) => {
      const res = plainToInstance(GetAllInstagramPostsXResponse, post, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${post.image}`;
      return res;
    });
  }
}