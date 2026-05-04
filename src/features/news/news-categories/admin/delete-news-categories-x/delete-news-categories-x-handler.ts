import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewsCategories } from '../../newsCategories.entity';
import { DeleteNewsCategoriesXRequest } from './delete-news-categories-x-request';

@Injectable()
@CommandHandler(DeleteNewsCategoriesXRequest)
export class DeleteNewsCategoriesXHandler implements ICommandHandler<DeleteNewsCategoriesXRequest> {
  async execute(cmd: DeleteNewsCategoriesXRequest): Promise<void> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    await NewsCategories.remove(category);
  }
}