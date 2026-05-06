import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetAllCountriesRequest } from './get-all-countries-request';
import { GetAllCountriesResponse } from './get-all-countries-response';
import { ConfigService } from '@nestjs/config';
import { ILike } from 'typeorm';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';

@QueryHandler(GetAllCountriesRequest)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllCountriesRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [countries, totalCount] = await Countries.findAndCount({
      where: query.title ? { title: ILike(`%${query.title}%`) } : {},
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = countries.map((country) => {
      const res = plainToInstance(GetAllCountriesResponse, country, { excludeExtraneousValues: true });
      res.flag = `${baseUrl}/${country.flag}`;
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