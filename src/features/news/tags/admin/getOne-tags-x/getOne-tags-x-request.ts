import { Query } from '@nestjs/cqrs';
import { GetOneTagsXResponse } from './getOne-tags-x-response';

export class GetOneTagsXRequest extends Query<GetOneTagsXResponse> {
  id!: number;
}