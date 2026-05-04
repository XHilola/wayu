import { Query } from '@nestjs/cqrs';
import { GetAllBranchesXResponse } from './getAll-branches-x-response';

export class GetAllBranchesXRequest extends Query<GetAllBranchesXResponse[]> {}