import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetOneCountriesXRequest } from './get-one-countries-x-request';
import { GetOneCountriesXResponse } from './get-one-countries-x-response';
import { ConfigService } from '@nestjs/config';

@QueryHandler(GetOneCountriesXRequest)
export class GetOneCountriesXHandler implements IQueryHandler<GetOneCountriesXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneCountriesXRequest): Promise<GetOneCountriesXResponse> {
    const country = await Countries.findOneBy({ id: query.id });
    if (!country)
      throw new NotFoundException('Country not found');
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const res = plainToInstance(GetOneCountriesXResponse, country, { excludeExtraneousValues: true });
    res.flag = `${baseUrl}/${country.flag}`;
    return res;
  }
}