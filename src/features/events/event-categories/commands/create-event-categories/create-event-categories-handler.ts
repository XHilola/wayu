import { CreateEventCategoriesRequest } from './create-event-categories-request';
import { EventCategories } from '../../eventCategories.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCategoriesResponse } from './create-event-categories-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateEventCategoriesRequest)
export class CreateEventCategoriesHandler implements ICommandHandler<CreateEventCategoriesRequest> {
  async execute(req: CreateEventCategoriesRequest): Promise<CreateEventCategoriesResponse> {
    const exists = await EventCategories.findOneBy({ title: req.title });
    if (exists) throw new BadRequestException('Event category already exists');

    const category = EventCategories.create({ title: req.title });
    await EventCategories.save(category);
    return plainToInstance(CreateEventCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}
