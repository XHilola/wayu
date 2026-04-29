import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinksResponse } from './get-all-useful-links-response';

export class GetAllUsefulLinksRequest extends Query<GetAllUsefulLinksResponse[]> {}
