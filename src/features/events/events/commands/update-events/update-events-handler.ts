import { UpdateEventsRequest } from './update-events-request';
import { Events } from '../../events.entity';
import { EventCategories } from '../../../event-categories/eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEventsResponse } from './update-events-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateEventsRequest)
export class UpdateEventsHandler implements ICommandHandler<UpdateEventsRequest> {
  async execute(req: UpdateEventsRequest): Promise<UpdateEventsResponse> {
    const event = await Events.findOne({ where: { id: req.id }, relations: ['category'] });
    if (!event) throw new NotFoundException('Event not found');

    if (req.categoryId !== undefined) {
      const category = await EventCategories.findOneBy({ id: req.categoryId });
      if (!category) throw new NotFoundException('Event category not found');
      event.categoryId = req.categoryId;
    }

    if (req.title   !== undefined) event.title   = req.title;
    if (req.content !== undefined) event.content = req.content;
    if (req.image   !== undefined) event.image   = req.image;
    if (req.date    !== undefined) event.date    = req.date;
    if (req.address !== undefined) event.address = req.address;

    await Events.save(event);

    const updated = await Events.findOne({ where: { id: event.id }, relations: ['category'] });
    return plainToInstance(UpdateEventsResponse, updated, { excludeExtraneousValues: true });
  }
}
