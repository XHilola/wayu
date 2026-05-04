import { Query } from '@nestjs/cqrs';
import { GetOneUsefulLinksResponse } from './get-one-useful-links-response';

export class GetOneUsefulLinksRequest extends Query<GetOneUsefulLinksResponse> {
  id!: number;
}
