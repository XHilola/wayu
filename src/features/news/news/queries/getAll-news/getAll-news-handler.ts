import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { News } from '../../news.entity';
import { GetAllNewsRequest } from './getAll-news-request';
import { GetAllNewsResponse } from './getAll-news-response';

@QueryHandler(GetAllNewsRequest)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllNewsRequest): Promise<GetAllNewsResponse[]> {
    const newsList = await News.find({ relations: ['category', 'country', 'tags'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return newsList.map((news) => {
      const res = plainToInstance(GetAllNewsResponse, news, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${news.image}`;
      return res;
    });
  }
}