import { GetAllNewsResponse } from './getAll-news-response';
import { Query } from '@nestjs/cqrs';

export class GetAllNewsRequest extends Query<GetAllNewsResponse[]> {}