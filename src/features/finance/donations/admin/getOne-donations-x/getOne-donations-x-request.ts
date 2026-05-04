import { Query } from '@nestjs/cqrs';
import { GetOneDonationsXResponse } from './getOne-donations-x-response';

export class GetOneDonationsXRequest extends Query<GetOneDonationsXResponse> {
  id!: number;
}