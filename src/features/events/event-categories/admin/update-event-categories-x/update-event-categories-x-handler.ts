import { UpdateEventCategoriesXRequest } from './update-event-categories-x-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEventCategoriesXResponse } from './update-event-categories-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateEventCategoriesXRequest)
export class UpdateEventCategoriesXHandler implements ICommandHandler<UpdateEventCategoriesXRequest> {
  async execute(req: UpdateEventCategoriesXRequest): Promise<UpdateEventCategoriesXResponse> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');

    if (req.title !== undefined)
      category.title = req.title;

    await EventCategories.save(category);
    return plainToInstance(UpdateEventCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}
