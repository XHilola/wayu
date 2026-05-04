import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetAllCountriesRequest } from './get-all-countries-request';
import { GetAllCountriesResponse } from './get-all-countries-response';
import { ConfigService } from '@nestjs/config';

@QueryHandler(GetAllCountriesRequest)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllCountriesRequest): Promise<GetAllCountriesResponse[]> {
    const countries = await Countries.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return countries.map((country) => {
      const res = plainToInstance(GetAllCountriesResponse, country, { excludeExtraneousValues: true });
      res.flag = `${baseUrl}/${country.flag}`;
      return res;
    });
  }
}