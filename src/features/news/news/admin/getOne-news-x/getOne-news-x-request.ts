import { Query } from '@nestjs/cqrs';
import { GetOneNewsXResponse } from './getOne-news-x-response';

export class GetOneNewsXRequest extends Query<GetOneNewsXResponse> {
  id!: number;
}