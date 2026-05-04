import { Query } from '@nestjs/cqrs';
import { GetAllBooksXResponse } from './getAll-books-x-response';

export class GetAllBooksXRequest extends Query<GetAllBooksXResponse[]> {}