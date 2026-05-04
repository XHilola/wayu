import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Events } from '../../events.entity';
import { GetOneEventsRequest } from './get-one-events-request';
import { GetOneEventsResponse } from './get-one-events-response';

@QueryHandler(GetOneEventsRequest)
export class GetOneEventsHandler implements IQueryHandler<GetOneEventsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneEventsRequest): Promise<GetOneEventsResponse> {
    const event = await Events.findOne({
      where: { id: query.id },
      relations: ['category'],
    });
    if (!event)
      throw new NotFoundException('Event not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneEventsResponse, event, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${event.image}`;
    return res;
  }
}