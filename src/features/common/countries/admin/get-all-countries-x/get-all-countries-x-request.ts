import { Query } from '@nestjs/cqrs';
import { GetAllCountriesXResponse } from './get-all-countries-x-response';

export class GetAllCountriesXRequest extends Query<GetAllCountriesXResponse[]> {}