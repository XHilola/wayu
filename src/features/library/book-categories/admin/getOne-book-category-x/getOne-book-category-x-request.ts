import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoryXResponse } from './getOne-book-category-x-response';

export class GetOneBookCategoryXRequest extends Query<GetOneBookCategoryXResponse>{
  id!:number
}