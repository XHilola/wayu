import { GetAllSocialLinksResponse } from './get-all-social-links-response';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSocialLinksRequest } from './get-all-social-links-request';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';
import { SocialLinks } from '../../socialLinks.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllSocialLinksRequest)
export class GetAllSocialLinksXHandler implements IQueryHandler<GetAllSocialLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllSocialLinksRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.link) where.link = ILike(`%${query.link}%`);

    const [links, totalCount] = await SocialLinks.findAndCount({
      where: Object.keys(where).length ? where : {},
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = links.map((link) => {
      const res = plainToInstance(GetAllSocialLinksResponse, link, { excludeExtraneousValues: true });
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