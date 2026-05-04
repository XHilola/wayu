import { Query } from '@nestjs/cqrs';
import { GetOneNewsCategoriesXResponse } from './getOne-news-categories-x-response';

export class GetOneNewsCategoriesXRequest extends Query<GetOneNewsCategoriesXResponse> {
  id!: number;
}