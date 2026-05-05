import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { GetAllNewsCategoriesXRequest } from './getAll-news-categories-x-request';
import { GetAllNewsCategoriesXResponse } from './getAll-news-categories-x-response';

// @Injectable()
@QueryHandler(GetAllNewsCategoriesXRequest)
export class GetAllNewsCategoriesXHandler implements IQueryHandler<GetAllNewsCategoriesXRequest> {
  async execute(query: GetAllNewsCategoriesXRequest): Promise<GetAllNewsCategoriesXResponse[]> {
    const categories = await NewsCategories.find();
    return plainToInstance(GetAllNewsCategoriesXResponse, categories, { excludeExtraneousValues: true });
  }
}