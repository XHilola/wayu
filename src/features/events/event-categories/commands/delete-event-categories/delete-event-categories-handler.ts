import { DeleteEventCategoriesRequest } from './delete-event-categories-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteEventCategoriesRequest)
export class DeleteEventCategoriesHandler implements ICommandHandler<DeleteEventCategoriesRequest> {
  async execute(req: DeleteEventCategoriesRequest): Promise<void> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');
    await EventCategories.remove(category);
  }
}
