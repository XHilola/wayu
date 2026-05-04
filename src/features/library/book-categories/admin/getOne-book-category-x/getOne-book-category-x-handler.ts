import { BadRequestException, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBookCategoryXRequest } from './getOne-book-category-x-request';
import { GetOneBookCategoryXResponse } from './getOne-book-category-x-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneBookCategoryXRequest)
export class GetOneBookCategoryXHandler implements IQueryHandler<GetOneBookCategoryXRequest> {
  async execute(query: GetOneBookCategoryXRequest): Promise<GetOneBookCategoryXResponse> {
    const bookCategory = await BookCategories.findOneBy({ id: query.id });
    if (!bookCategory)
      throw new BadRequestException('BookCategory isn\'t found');
    return plainToInstance(GetOneBookCategoryXResponse,bookCategory,{excludeExtraneousValues:true})
  }

}