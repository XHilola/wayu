import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { BookCategories } from '../../bookCategories.entity';
import { GetAllBookCategoryXRequest } from './getAll-book-category-x-request';
import { GetAllBookCategoryXResponse } from './getAll-book-category-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllBookCategoryXRequest)
export class GetAllBookCategoryXHandler implements IQueryHandler<GetAllBookCategoryXRequest> {
  async execute(query: GetAllBookCategoryXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await BookCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllBookCategoryXResponse, cat, { excludeExtraneousValues: true }),
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