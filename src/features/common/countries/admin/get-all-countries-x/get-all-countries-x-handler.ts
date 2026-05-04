import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { GetAllCountriesXRequest } from './get-all-countries-x-request';
import { GetAllCountriesXResponse } from './get-all-countries-x-response';
import { ConfigService } from '@nestjs/config';

@QueryHandler(GetAllCountriesXRequest)
export class GetAllCountriesXHandler implements IQueryHandler<GetAllCountriesXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllCountriesXRequest): Promise<GetAllCountriesXResponse[]> {
    const countries = await Countries.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return countries.map((country) => {
      const res = plainToInstance(GetAllCountriesXResponse, country, { excludeExtraneousValues: true });
      res.flag = `${baseUrl}/${country.flag}`;
      return res;
    });
  }
}