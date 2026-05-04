import { GetAllEventCategoriesXRequest } from './get-all-event-categories-x-request';
import { EventCategories } from '../../eventCategories.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEventCategoriesXResponse } from './get-all-event-categories-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllEventCategoriesXRequest)
export class GetAllEventCategoriesXHandler implements IQueryHandler<GetAllEventCategoriesXRequest> {
  async execute(): Promise<GetAllEventCategoriesXResponse[]> {
    const categories = await EventCategories.find();
    return plainToInstance(GetAllEventCategoriesXResponse, categories, { excludeExtraneousValues: true });
  }
}
