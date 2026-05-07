import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesXRequest } from './get-all-event-categories-x-request';
import { GetAllEventCategoriesXResponse } from './get-all-event-categories-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';
import { EventCategories } from '../../eventCategories.entity';

@QueryHandler(GetAllEventCategoriesXRequest)
export class GetAllEventCategoriesXHandler implements IQueryHandler<GetAllEventCategoriesXRequest> {
  async execute(query: GetAllEventCategoriesXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [categories, totalCount] = await EventCategories.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = categories.map((cat) =>
      plainToInstance(GetAllEventCategoriesXResponse, cat, { excludeExtraneousValues: true }),
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