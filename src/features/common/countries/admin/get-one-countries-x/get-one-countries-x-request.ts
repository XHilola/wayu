import { Query } from '@nestjs/cqrs';
import { GetOneCountriesXResponse } from './get-one-countries-x-response';

export class GetOneCountriesXRequest extends Query<GetOneCountriesXResponse> {
  id!: number;
}