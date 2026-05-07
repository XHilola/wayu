import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetAllTagsXRequest } from './getAll-tags-x-request';
import { GetAllTagsXResponse } from './getAll-tags-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllTagsXRequest)
export class GetAllTagsXHandler implements IQueryHandler<GetAllTagsXRequest> {
  async execute(query: GetAllTagsXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [tags, totalCount] = await Tags.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = tags.map((tag) =>
      plainToInstance(GetAllTagsXResponse, tag, { excludeExtraneousValues: true }),
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