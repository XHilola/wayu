import { Query } from '@nestjs/cqrs';
import { GetOneBranchesXResponse } from './getOne-branches-x-response';

export class GetOneBranchesXRequest extends Query<GetOneBranchesXResponse> {
  id!: number;
}