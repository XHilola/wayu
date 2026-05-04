import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsXResponse } from './getOne-applications-x-response';

export class GetOneApplicationsXRequest extends Query<GetOneApplicationsXResponse> {
  id!: number;
}