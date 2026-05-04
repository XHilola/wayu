import { DeleteEventCategoriesXRequest } from './delete-event-categories-x-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteEventCategoriesXRequest)
export class DeleteEventCategoriesXHandler implements ICommandHandler<DeleteEventCategoriesXRequest> {
  async execute(req: DeleteEventCategoriesXRequest): Promise<void> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');
    await EventCategories.remove(category);
  }
}
