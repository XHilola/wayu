import { Query } from '@nestjs/cqrs';
import { GetOneBooksXResponse } from './getOne-books-x-response';

export class GetOneBooksXRequest extends Query<GetOneBooksXResponse> {
  id!: number;
}