import { Query } from '@nestjs/cqrs';
import { GetAllInstagramPostsXResponse } from './get-all-instagram-posts-x-response';

export class GetAllInstagramPostsXRequest extends Query<GetAllInstagramPostsXResponse[]> {}
