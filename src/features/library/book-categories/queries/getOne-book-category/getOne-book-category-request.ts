import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoryResponse } from './getOne-book-category-response';

export class GetOneBookCategoryRequest extends Query<GetOneBookCategoryResponse>{
  id!:number
}