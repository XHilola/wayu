import { Query } from '@nestjs/cqrs';
import { GetAllDonationsResponse } from './getAll-donations-response';

export class GetAllDonationsRequest extends Query<GetAllDonationsResponse[]> {}