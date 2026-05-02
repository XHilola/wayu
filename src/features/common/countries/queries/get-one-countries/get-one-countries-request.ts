import { Query } from '@nestjs/cqrs';
import { GetOneCountriesResponse } from './get-one-countries-response';

export class GetOneCountriesRequest extends Query<GetOneCountriesResponse> {
  id!: number;
}