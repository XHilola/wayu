import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { News } from '../../news.entity';
import { GetAllNewsXRequest } from './getAll-news-x-request';
import { GetAllNewsXResponse } from './getAll-news-x-response';

@QueryHandler(GetAllNewsXRequest)
export class GetAllNewsXHandler implements IQueryHandler<GetAllNewsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllNewsXRequest): Promise<GetAllNewsXResponse[]> {
    const newsList = await News.find({ relations: ['category', 'country', 'tags'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return newsList.map((news) => {
      const res = plainToInstance(GetAllNewsXResponse, news, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${news.image}`;
      return res;
    });
  }
}