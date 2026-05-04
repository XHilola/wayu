import { Query } from '@nestjs/cqrs';
import { GetAllBooksResponse } from './getAll-books-response';

export class GetAllBooksRequest extends Query<GetAllBooksResponse[]> {}