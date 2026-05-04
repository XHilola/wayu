import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsResponse } from './getOne-applications-response';

export class GetOneApplicationsRequest extends Query<GetOneApplicationsResponse> {
  id!: number;
}