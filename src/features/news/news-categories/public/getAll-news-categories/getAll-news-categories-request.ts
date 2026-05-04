import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesResponse } from './getAll-news-categories-response';

export class GetAllNewsCategoriesRequest extends Query<GetAllNewsCategoriesResponse[]> {}