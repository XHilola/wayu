import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsefulLinksRequest } from './get-all-useful-links-request';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';
import { UsefulLinks } from '../../usefulLinks.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllUsefulLinksResponse } from './get-all-useful-links-response';

@QueryHandler(GetAllUsefulLinksRequest)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllUsefulLinksRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.link) where.link = ILike(`%${query.link}%`);

    const [links, totalCount] = await UsefulLinks.findAndCount({
      where: Object.keys(where).length ? where : {},
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = links.map((link) => {
      const res = plainToInstance(GetAllUsefulLinksResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
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