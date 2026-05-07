import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Events } from '../../events.entity';
import { GetAllEventsXRequest } from './get-all-events-x-request';
import { GetAllEventsXResponse } from './get-all-events-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ConfigService } from '@nestjs/config';
import { ILike } from 'typeorm';

@QueryHandler(GetAllEventsXRequest)
export class GetAllEventsXHandler implements IQueryHandler<GetAllEventsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllEventsXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.address) where.address = ILike(`%${query.address}%`);
    if (query.categoryId) where.categoryId = query.categoryId;

    const [events, totalCount] = await Events.findAndCount({
      where: Object.keys(where).length ? where : {},
      relations: ['category'],
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = events.map((event) => {
      const res = plainToInstance(GetAllEventsXResponse, event, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${event.image}`;
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