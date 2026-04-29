import { GetOneCountriesRequest } from './get-one-countries-request';
import { Countries } from '../../countries.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneCountriesResponse } from './get-one-countries-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneCountriesRequest)
export class GetOneCountriesHandler implements IQueryHandler<GetOneCountriesRequest> {
  async execute(req: GetOneCountriesRequest): Promise<GetOneCountriesResponse> {
    const country = await Countries.findOneBy({ id: req.id });
    if (!country) throw new NotFoundException('Country not found');
    return plainToInstance(GetOneCountriesResponse, country, { excludeExtraneousValues: true });
  }
}
