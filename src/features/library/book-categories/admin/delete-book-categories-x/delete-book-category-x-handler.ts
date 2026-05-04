import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCategoryXRequest } from './delete-book-category-x-request';
import { BookCategories } from '../../bookCategories.entity';

@Injectable()
@CommandHandler(DeleteBookCategoryXRequest)
export class DeleteBookCategoryXHandler implements ICommandHandler<DeleteBookCategoryXRequest> {
  async execute(command: DeleteBookCategoryXRequest): Promise<void> {
    const bookCategory = await BookCategories.findOneBy({ id: command.id });
    if (!bookCategory)
      throw new NotFoundException("BookCategory not found")
    await BookCategories.remove(bookCategory)
  }
}