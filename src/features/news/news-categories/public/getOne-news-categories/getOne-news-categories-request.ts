import { Query } from '@nestjs/cqrs';
import { GetOneNewsCategoriesResponse } from './getOne-news-categories-response';

export class GetOneNewsCategoriesRequest extends Query<GetOneNewsCategoriesResponse> {
  id!: number;
}