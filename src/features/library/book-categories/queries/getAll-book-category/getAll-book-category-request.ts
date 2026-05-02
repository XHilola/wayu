import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoryResponse } from './getAll-book-category-response';

export class GetAllBookCategoryRequest extends Query<GetAllBookCategoryResponse[]>{}