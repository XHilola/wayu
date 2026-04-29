import { UpdateEventCategoriesRequest } from './update-event-categories-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEventCategoriesResponse } from './update-event-categories-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateEventCategoriesRequest)
export class UpdateEventCategoriesHandler implements ICommandHandler<UpdateEventCategoriesRequest> {
  async execute(req: UpdateEventCategoriesRequest): Promise<UpdateEventCategoriesResponse> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');

    if (req.title !== undefined) category.title = req.title;

    await EventCategories.save(category);
    return plainToInstance(UpdateEventCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}
