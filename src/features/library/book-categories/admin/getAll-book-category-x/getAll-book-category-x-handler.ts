import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBookCategoryXRequest } from './getAll-book-category-x-request';
import { GetAllBookCategoryXResponse } from './getAll-book-category-x-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllBookCategoryXRequest)
export class GetAllBookCategoryXHandler implements IQueryHandler<GetAllBookCategoryXRequest> {
  async execute(query: GetAllBookCategoryXRequest): Promise<GetAllBookCategoryXResponse[]> {
    const bookCategories = await BookCategories.find({relations:['books']});
    return plainToInstance(GetAllBookCategoryXResponse,bookCategories,{excludeExtraneousValues:true})
  }
}