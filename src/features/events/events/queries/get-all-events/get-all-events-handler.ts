import { GetAllEventsRequest } from './get-all-events-request';
import { Events } from '../../events.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllEventsResponse } from './get-all-events-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllEventsRequest)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsRequest> {
  async execute(): Promise<GetAllEventsResponse[]> {
    const events = await Events.find({ relations: ['category'] });
    return plainToInstance(GetAllEventsResponse, events, { excludeExtraneousValues: true });
  }
}
