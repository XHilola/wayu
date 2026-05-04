import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCategoryXRequest } from './update-book-category-x-request';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateBookCategoryXResponse } from './update-book-category-x-response';

@Injectable()
@CommandHandler(UpdateBookCategoryXRequest)
export class UpdateBookCategoryXHandler implements ICommandHandler<UpdateBookCategoryXRequest> {
  async execute(cmd: UpdateBookCategoryXRequest): Promise<UpdateBookCategoryXResponse> {
    const bookCategory = await BookCategories.findOneBy({ id: cmd.id });
    if (!bookCategory)
      throw new NotFoundException('BookCategory isn\'t found');
    bookCategory.title=cmd.title
    await BookCategories.save(bookCategory)
    return plainToInstance(UpdateBookCategoryXResponse,bookCategory,{excludeExtraneousValues:true})
  }

}