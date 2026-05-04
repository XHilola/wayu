import { GetOneEventCategoriesXRequest } from './get-one-event-categories-x-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneEventCategoriesXResponse } from './get-one-event-categories-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneEventCategoriesXRequest)
export class GetOneEventCategoriesXHandler implements IQueryHandler<GetOneEventCategoriesXRequest> {
  async execute(req: GetOneEventCategoriesXRequest): Promise<GetOneEventCategoriesXResponse> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');
    return plainToInstance(GetOneEventCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}
