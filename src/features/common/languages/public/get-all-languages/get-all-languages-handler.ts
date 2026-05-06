import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Languages } from '../../languages.entity';
import { GetAllLanguagesRequest } from './get-all-languages-request';
import { GetAllLanguagesResponse } from './get-all-languages-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllLanguagesRequest)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesRequest> {
  async execute(query: GetAllLanguagesRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [languages, totalCount] = await Languages.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = languages.map((lang) =>
      plainToInstance(GetAllLanguagesResponse, lang, { excludeExtraneousValues: true }),
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