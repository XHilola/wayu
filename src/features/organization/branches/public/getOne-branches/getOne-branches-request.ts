import { Query } from '@nestjs/cqrs';
import { GetOneBranchesResponse } from './getOne-branches-response';

export class GetOneBranchesRequest extends Query<GetOneBranchesResponse> {
  id!: number;
}