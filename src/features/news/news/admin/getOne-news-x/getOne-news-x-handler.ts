import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsXRequest } from './getOne-news-x-request';
import { ConfigService } from '@nestjs/config';
import { GetOneNewsXResponse } from './getOne-news-x-response';
import { News } from '../../news.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneNewsXRequest)
export class GetOneNewsXHandler implements IQueryHandler<GetOneNewsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneNewsXRequest): Promise<GetOneNewsXResponse> {
    const news = await News.findOne({
      where: { id: query.id },
      relations: ['category', 'country', 'tags'],
    });
    if (!news) throw new NotFoundException('News not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneNewsXResponse, news, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${news.image}`;
    return res;
  }
}