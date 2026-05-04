import { CreateEventCategoriesXRequest } from './create-event-categories-x-request';
import { EventCategories } from '../../eventCategories.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCategoriesXResponse } from './create-event-categories-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateEventCategoriesXRequest)
export class CreateEventCategoriesXHandler implements ICommandHandler<CreateEventCategoriesXRequest> {
  async execute(req: CreateEventCategoriesXRequest): Promise<CreateEventCategoriesXResponse> {
    const exists = await EventCategories.findOneBy({ title: req.title });
    if (exists) throw new BadRequestException('Event category already exists');

    const category = EventCategories.create({ title: req.title });
    await EventCategories.save(category);
    return plainToInstance(CreateEventCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}
