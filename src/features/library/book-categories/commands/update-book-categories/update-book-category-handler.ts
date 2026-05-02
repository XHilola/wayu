import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCategoryRequest } from './update-book-category-request';
import { UpdateBookCategoryResponse } from './update-book-category-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateBookCategoryRequest)
export class UpdateBookCategoryHandler implements ICommandHandler<UpdateBookCategoryRequest> {
  async execute(cmd: UpdateBookCategoryRequest): Promise<UpdateBookCategoryResponse> {
    const bookCategory = await BookCategories.findOneBy({ id: cmd.id });
    if (!bookCategory)
      throw new NotFoundException('BookCategory isn\'t found');
    bookCategory.title=cmd.title
    await BookCategories.save(bookCategory)
    return plainToInstance(UpdateBookCategoryResponse,bookCategory,{excludeExtraneousValues:true})
  }

}