import { Query } from '@nestjs/cqrs';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts-response';

export class GetAllInstagramPostsRequest extends Query<GetAllInstagramPostsResponse[]> {}
