import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetAllCountriesXRequest } from './get-all-countries-x-request';
import { GetAllCountriesXResponse } from './get-all-countries-x-response';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';

@QueryHandler(GetAllCountriesXRequest)
export class GetAllCountriesXHandler implements IQueryHandler<GetAllCountriesXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllCountriesXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [countries, totalCount] = await Countries.findAndCount({
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = countries.map((country) => {
      const res = plainToInstance(GetAllCountriesXResponse, country, { excludeExtraneousValues: true });
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