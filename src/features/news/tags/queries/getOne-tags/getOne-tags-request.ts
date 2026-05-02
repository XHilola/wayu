import { Query } from '@nestjs/cqrs';
import { GetOneTagsResponse } from './getOne-tags-response';

export class GetOneTagsRequest extends Query<GetOneTagsResponse> {
  id!: number;
}