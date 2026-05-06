import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSocialLinksXRequest } from './get-all-social-links-x-request';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';
import { SocialLinks } from '../../socialLinks.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllSocialLinksXResponse } from './get-all-social-links-x-response';


@QueryHandler(GetAllSocialLinksXRequest)
export class GetAllSocialLinksXHandler implements IQueryHandler<GetAllSocialLinksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllSocialLinksXRequest): Promise<PaginatedResult> {
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
      const res = plainToInstance(GetAllSocialLinksXResponse, link, { excludeExtraneousValues: true });
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