import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsRequest } from './getOne-news-request';
import { ConfigService } from '@nestjs/config';
import { GetOneNewsResponse } from './getOne-news-response';
import { News } from '../../news.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneNewsRequest)
export class GetOneNewsHandler implements IQueryHandler<GetOneNewsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneNewsRequest): Promise<GetOneNewsResponse> {
    const news = await News.findOne({
      where: { id: query.id },
      relations: ['category', 'country', 'tags'],
    });
    if (!news) throw new NotFoundException('News not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneNewsResponse, news, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${news.image}`;
    return res;
  }
}