import { Query } from '@nestjs/cqrs';
import { GetOneStaticInfoXResponse } from './get-one-static-info-x-response';

export class GetOneStaticInfoXRequest extends Query<GetOneStaticInfoXResponse> {
  id!: number;
}
