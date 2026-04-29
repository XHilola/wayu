import { GetOneEventCategoriesRequest } from './get-one-event-categories-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneEventCategoriesResponse } from './get-one-event-categories-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneEventCategoriesRequest)
export class GetOneEventCategoriesHandler implements IQueryHandler<GetOneEventCategoriesRequest> {
  async execute(req: GetOneEventCategoriesRequest): Promise<GetOneEventCategoriesResponse> {
    const category = await EventCategories.findOneBy({ id: req.id });
    if (!category) throw new NotFoundException('Event category not found');
    return plainToInstance(GetOneEventCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}
