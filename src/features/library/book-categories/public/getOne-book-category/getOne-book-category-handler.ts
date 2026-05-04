import { BadRequestException, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBookCategoryRequest } from './getOne-book-category-request';
import { GetOneBookCategoryResponse } from './getOne-book-category-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneBookCategoryRequest)
export class GetOneBookCategoryHandler implements IQueryHandler<GetOneBookCategoryRequest> {
  async execute(query: GetOneBookCategoryRequest): Promise<GetOneBookCategoryResponse> {
    const bookCategory = await BookCategories.findOneBy({ id: query.id });
    if (!bookCategory)
      throw new BadRequestException('BookCategory isn\'t found');
    return plainToInstance(GetOneBookCategoryResponse,bookCategory,{excludeExtraneousValues:true})
  }

}