import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { BookCategories } from '../../bookCategories.entity';
import { GetAllBookCategoryRequest } from './getAll-book-category-request';
import { GetAllBookCategoryResponse } from './getAll-book-category-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllBookCategoryRequest)
export class GetAllBookCategoryHandler implements IQueryHandler<GetAllBookCategoryRequest> {
  async execute(query: GetAllBookCategoryRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await BookCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllBookCategoryResponse, cat, { excludeExtraneousValues: true }),
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