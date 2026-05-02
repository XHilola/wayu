import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetOneNewsCategoriesResponse } from './getOne-news-categories-response';
import { GetOneNewsCategoriesRequest } from './getOne-news-categories-request';

@Injectable()
@QueryHandler(GetOneNewsCategoriesRequest)
export class GetOneNewsCategoriesHandler implements IQueryHandler<GetOneNewsCategoriesRequest> {
  async execute(query: GetOneNewsCategoriesRequest): Promise<GetOneNewsCategoriesResponse> {
    const category = await NewsCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('News category not found');
    return plainToInstance(GetOneNewsCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}