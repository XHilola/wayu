import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetAllCountriesXRequest } from './get-all-countries-x-request';
import { GetAllCountriesXResponse } from './get-all-countries-x-response';
import { ConfigService } from '@nestjs/config';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import {Cache} from '@nestjs/cache-manager';

@QueryHandler(GetAllCountriesXRequest)
export class GetAllCountriesXHandler implements IQueryHandler<GetAllCountriesXRequest> {
  constructor(
    private readonly config: ConfigService,
    private readonly cache:Cache
    ) {}

  async execute(query: GetAllCountriesXRequest): Promise<PaginatedResult> {
    const take = query.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
    const currentPage = query.page ?? 1;
    const cachedData=await this.cache.get<PaginatedResult>(`country:${currentPage}:${take}`)
    if (cachedData){
      return cachedData
    }
    const skip = (currentPage - 1) * take;

    const [countries, totalCount] = await Countries.findAndCount({
      skip,
      take,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = countries.map((country) => {
      const res = plainToInstance(GetAllCountriesXResponse, country, { excludeExtraneousValues: true });
      res.flag = `${baseUrl}/${country.flag}`;
      return res;
    });

    const totalPages = Math.ceil(totalCount / take);

    const payload= {
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : undefined,
      currentPage,
      nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
      totalCount,
      data,
    };
    await this.cache.set(`country:${currentPage}:${take}`,payload)
    return payload
  }
}