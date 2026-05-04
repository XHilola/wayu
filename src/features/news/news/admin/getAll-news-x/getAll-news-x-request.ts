import { GetAllNewsXResponse } from './getAll-news-x-response';
import { Query } from '@nestjs/cqrs';

export class GetAllNewsXRequest extends Query<GetAllNewsXResponse[]> {}