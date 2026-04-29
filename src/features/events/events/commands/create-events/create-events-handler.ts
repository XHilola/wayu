import { CreateEventsRequest } from './create-events-request';
import { Events } from '../../events.entity';
import { EventCategories } from '../../../event-categories/eventCategories.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventsResponse } from './create-events-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateEventsRequest)
export class CreateEventsHandler implements ICommandHandler<CreateEventsRequest> {
  async execute(req: CreateEventsRequest): Promise<CreateEventsResponse> {
    const category = await EventCategories.findOneBy({ id: req.categoryId });
    if (!category) throw new NotFoundException('Event category not found');

    const event = Events.create({
      categoryId: req.categoryId,
      title: req.title,
      content: req.content,
      image: req.image,
      date: req.date,
      address: req.address,
    });
    await Events.save(event);

    const saved = await Events.findOne({ where: { id: event.id }, relations: ['category'] });
    return plainToInstance(CreateEventsResponse, saved, { excludeExtraneousValues: true });
  }
}
