import { GetAllEventCategoriesRequest } from './get-all-event-categories-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEventCategoriesResponse } from './get-all-event-categories-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllEventCategoriesRequest)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesRequest> {
  async execute(): Promise<GetAllEventCategoriesResponse[]> {
    const categories = await EventCategories.find();
    return plainToInstance(GetAllEventCategoriesResponse, categories, { excludeExtraneousValues: true });
  }
}
