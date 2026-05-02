import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewsCategories } from '../../newsCategories.entity';
import { DeleteNewsCategoriesRequest } from './delete-news-categories-request';

@Injectable()
@CommandHandler(DeleteNewsCategoriesRequest)
export class DeleteNewsCategoriesHandler implements ICommandHandler<DeleteNewsCategoriesRequest> {
  async execute(cmd: DeleteNewsCategoriesRequest): Promise<void> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    await NewsCategories.remove(category);
  }
}