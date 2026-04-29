import { GetOneEventsRequest } from './get-one-events-request';
import { Events } from '../../events.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneEventsResponse } from './get-one-events-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneEventsRequest)
export class GetOneEventsHandler implements IQueryHandler<GetOneEventsRequest> {
  async execute(req: GetOneEventsRequest): Promise<GetOneEventsResponse> {
    const event = await Events.findOne({ where: { id: req.id }, relations: ['category'] });
    if (!event) throw new NotFoundException('Event not found');
    return plainToInstance(GetOneEventsResponse, event, { excludeExtraneousValues: true });
  }
}
