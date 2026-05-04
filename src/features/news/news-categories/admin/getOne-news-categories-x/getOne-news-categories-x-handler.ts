import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetOneNewsCategoriesXResponse } from './getOne-news-categories-x-response';
import { GetOneNewsCategoriesXRequest } from './getOne-news-categories-x-request';

@Injectable()
@QueryHandler(GetOneNewsCategoriesXRequest)
export class GetOneNewsCategoriesXHandler implements IQueryHandler<GetOneNewsCategoriesXRequest> {
  async execute(query: GetOneNewsCategoriesXRequest): Promise<GetOneNewsCategoriesXResponse> {
    const category = await NewsCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('News category not found');
    return plainToInstance(GetOneNewsCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}