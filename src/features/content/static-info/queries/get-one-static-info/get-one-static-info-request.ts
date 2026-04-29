import { Query } from '@nestjs/cqrs';
import { GetOneStaticInfoResponse } from './get-one-static-info-response';

export class GetOneStaticInfoRequest extends Query<GetOneStaticInfoResponse> {
  id!: number;
}
