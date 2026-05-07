import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetAllTagsRequest } from './getAll-tags-request';
import { GetAllTagsResponse } from './getAll-tags-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllTagsRequest)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsRequest> {
  async execute(query: GetAllTagsRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [tags, totalCount] = await Tags.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = tags.map((tag) =>
      plainToInstance(GetAllTagsResponse, tag, { excludeExtraneousValues: true }),
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