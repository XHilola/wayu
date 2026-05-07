import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEventCategoriesRequest } from './get-all-event-categories-request';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { EventCategories } from '../../eventCategories.entity';
import { ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesResponse } from './get-all-event-categories-response';


@QueryHandler(GetAllEventCategoriesRequest)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesRequest> {
  async execute(query: GetAllEventCategoriesRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await EventCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllEventCategoriesResponse, cat, { excludeExtraneousValues: true }),
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