import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetAllNewsCategoriesRequest } from './getAll-news-categories-request';
import { GetAllNewsCategoriesResponse } from './getAll-news-categories-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllNewsCategoriesRequest)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesRequest> {
  async execute(query: GetAllNewsCategoriesRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await NewsCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllNewsCategoriesResponse, cat, { excludeExtraneousValues: true }),
    );

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