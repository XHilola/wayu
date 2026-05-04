import { Query } from '@nestjs/cqrs';
import { GetAllDonationsXResponse } from './getAll-donations-x-response';

export class GetAllDonationsXRequest extends Query<GetAllDonationsXResponse[]> {}