import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetAllNewsCategoriesXRequest } from './getAll-news-categories-x-request';
import { GetAllNewsCategoriesXResponse } from './getAll-news-categories-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllNewsCategoriesXRequest)
export class GetAllNewsCategoriesXHandler implements IQueryHandler<GetAllNewsCategoriesXRequest> {
  async execute(query: GetAllNewsCategoriesXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await NewsCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllNewsCategoriesXResponse, cat, { excludeExtraneousValues: true }),
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