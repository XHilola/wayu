import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { News } from '../../news.entity';
import { GetAllNewsRequest } from './getAll-news-request';
import { GetAllNewsResponse } from './getAll-news-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ConfigService } from '@nestjs/config';
import { ILike } from 'typeorm';

@QueryHandler(GetAllNewsRequest)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllNewsRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.countryId) where.countryId = query.countryId;

    const [news, totalCount] = await News.findAndCount({
      where: Object.keys(where).length ? where : {},
      relations: ['category', 'country', 'tags'],
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = news.map((item) => {
      const res = plainToInstance(GetAllNewsResponse, item, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${item.image}`;
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