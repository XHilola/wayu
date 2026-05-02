import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBookCategoryRequest } from './getAll-book-category-request';
import { GetAllBookCategoryResponse } from './getAll-book-category-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllBookCategoryRequest)
export class GetAllBookCategoryHandler implements IQueryHandler<GetAllBookCategoryRequest> {
  async execute(query: GetAllBookCategoryRequest): Promise<GetAllBookCategoryResponse[]> {
    const bookCategories = await BookCategories.find({relations:['books']});
    return plainToInstance(GetAllBookCategoryResponse,bookCategories,{excludeExtraneousValues:true})
  }
}