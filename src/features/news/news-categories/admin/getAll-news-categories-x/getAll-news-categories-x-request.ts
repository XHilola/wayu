import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesXResponse } from './getAll-news-categories-x-response';

export class GetAllNewsCategoriesXRequest extends Query<GetAllNewsCategoriesXResponse[]> {}