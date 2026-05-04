import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetAllNewsCategoriesRequest } from './getAll-news-categories-request';
import { GetAllNewsCategoriesResponse } from './getAll-news-categories-response';

@Injectable()
@QueryHandler(GetAllNewsCategoriesRequest)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesRequest> {
  async execute(query: GetAllNewsCategoriesRequest): Promise<GetAllNewsCategoriesResponse[]> {
    const categories = await NewsCategories.find();
    return plainToInstance(GetAllNewsCategoriesResponse, categories, { excludeExtraneousValues: true });
  }
}