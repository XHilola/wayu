import { Query } from '@nestjs/cqrs';
import { GetOneInstagramPostsXResponse } from './get-one-instagram-posts-x-response';

export class GetOneInstagramPostsXRequest extends Query<GetOneInstagramPostsXResponse> {
  id!: number;
}
