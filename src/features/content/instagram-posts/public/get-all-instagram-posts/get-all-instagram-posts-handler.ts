import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllInstagramPostsRequest } from './get-all-instagram-posts-request';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { InstagramPosts } from '../../instagramPosts.entity';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts-response';

@QueryHandler(GetAllInstagramPostsRequest)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllInstagramPostsRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [posts, totalCount] = await InstagramPosts.findAndCount({
      where: query.link ? { link: ILike(`%${query.link}%`) } : {},
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = posts.map((post) => {
      const res = plainToInstance(GetAllInstagramPostsResponse, post, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${post.image}`;
      return res;
    });

    const totalPages = Math.ceil(totalCount / size);

    return {
      totalPages,
      previousPage: page > 1 ? page - 1 : undefined,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : undefined,
      totalCount,
      data,
    };
  }
}