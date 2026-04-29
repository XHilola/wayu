import { GetAllCountriesRequest } from './get-all-countries-request';
import { Countries } from '../../countries.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCountriesResponse } from './get-all-countries-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllCountriesRequest)
export class GetAllCountriesHandler implements IQueryHandler<GetAllCountriesRequest> {
  async execute(): Promise<GetAllCountriesResponse[]> {
    const countries = await Countries.find();
    return plainToInstance(GetAllCountriesResponse, countries, { excludeExtraneousValues: true });
  }
}
