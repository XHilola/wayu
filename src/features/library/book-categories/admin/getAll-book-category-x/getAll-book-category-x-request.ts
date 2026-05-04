import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoryXResponse } from './getAll-book-category-x-response';

export class GetAllBookCategoryXRequest extends Query<GetAllBookCategoryXResponse[]>{}