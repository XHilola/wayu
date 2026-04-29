import { Query } from '@nestjs/cqrs';
import { GetOneSocialLinksResponse } from './get-one-social-links-response';

export class GetOneSocialLinksRequest extends Query<GetOneSocialLinksResponse> {
  id!: number;
}
