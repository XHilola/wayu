import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from './getOne-news-response';

export class GetOneNewsRequest extends Query<GetOneNewsResponse> {
  id!: number;
}