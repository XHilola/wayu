import { Query } from '@nestjs/cqrs';
import { GetAllBranchesResponse } from './getAll-branches-response';

export class GetAllBranchesRequest extends Query<GetAllBranchesResponse[]> {}