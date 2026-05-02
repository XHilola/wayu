import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCategoryRequest } from './delete-book-category-request';
import { BookCategories } from '../../bookCategories.entity';

@Injectable()
@CommandHandler(DeleteBookCategoryRequest)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryRequest> {
  async execute(command: DeleteBookCategoryRequest): Promise<void> {
    const bookCategory = await BookCategories.findOneBy({ id: command.id });
    if (!bookCategory)
      throw new NotFoundException("BookCategory not found")
    await BookCategories.remove(bookCategory)
  }
}