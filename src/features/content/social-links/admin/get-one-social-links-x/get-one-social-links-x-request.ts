import { Query } from '@nestjs/cqrs';
import { GetOneSocialLinksXResponse } from './get-one-social-links-x-response';

export class GetOneSocialLinksXRequest extends Query<GetOneSocialLinksXResponse> {
  id!: number;
}
