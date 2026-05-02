import { Query } from '@nestjs/cqrs';
import { GetOneDonationsResponse } from './getOne-donations-response';

export class GetOneDonationsRequest extends Query<GetOneDonationsResponse> {
  id!: number;
}