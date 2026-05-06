import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Languages } from '../../languages.entity';
import { GetAllLanguagesXRequest } from './get-all-languages-x-request';
import { GetAllLanguagesXResponse } from './get-all-languages-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllLanguagesXRequest)
export class GetAllLanguagesXHandler implements IQueryHandler<GetAllLanguagesXRequest> {
  async execute(query: GetAllLanguagesXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [languages, totalCount] = await Languages.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const data = languages.map((lang) =>
      plainToInstance(GetAllLanguagesXResponse, lang, { excludeExtraneousValues: true }),
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