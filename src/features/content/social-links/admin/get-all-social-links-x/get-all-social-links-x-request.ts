import { Query } from '@nestjs/cqrs';
import { GetAllSocialLinksXResponse } from './get-all-social-links-x-response';

export class GetAllSocialLinksXRequest extends Query<GetAllSocialLinksXResponse[]> {}
