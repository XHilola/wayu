import { Query } from '@nestjs/cqrs';
import { GetOneInstagramPostsResponse } from './get-one-instagram-posts-response';

export class GetOneInstagramPostsRequest extends Query<GetOneInstagramPostsResponse> {
  id!: number;
}
