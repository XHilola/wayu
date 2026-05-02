import { Query } from '@nestjs/cqrs';
import { GetOneBooksResponse } from './getOne-books-response';

export class GetOneBooksRequest extends Query<GetOneBooksResponse> {
  id!: number;
}