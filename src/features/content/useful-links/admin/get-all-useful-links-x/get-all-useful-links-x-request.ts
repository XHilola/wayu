import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinksXResponse } from './get-all-useful-links-x-response';

export class GetAllUsefulLinksXRequest extends Query<GetAllUsefulLinksXResponse[]> {}
