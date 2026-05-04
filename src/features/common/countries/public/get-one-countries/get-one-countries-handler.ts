import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetOneCountriesRequest } from './get-one-countries-request';
import { GetOneCountriesResponse } from './get-one-countries-response';
import { ConfigService } from '@nestjs/config';

@QueryHandler(GetOneCountriesRequest)
export class GetOneCountriesHandler implements IQueryHandler<GetOneCountriesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneCountriesRequest): Promise<GetOneCountriesResponse> {
    const country = await Countries.findOneBy({ id: query.id });
    if (!country)
      throw new NotFoundException('Country not found');
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const res = plainToInstance(GetOneCountriesResponse, country, { excludeExtraneousValues: true });
    res.flag = `${baseUrl}/${country.flag}`;
    return res;
  }
}