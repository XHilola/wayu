import { Query } from '@nestjs/cqrs';
import { GetOneUsefulLinksXResponse } from './get-one-useful-links-x-response';

export class GetOneUsefulLinksXRequest extends Query<GetOneUsefulLinksXResponse> {
  id!: number;
}
