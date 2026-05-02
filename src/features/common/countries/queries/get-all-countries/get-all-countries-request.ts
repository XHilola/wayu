import { Query } from '@nestjs/cqrs';
import { GetAllCountriesResponse } from './get-all-countries-response';

export class GetAllCountriesRequest extends Query<GetAllCountriesResponse[]> {}