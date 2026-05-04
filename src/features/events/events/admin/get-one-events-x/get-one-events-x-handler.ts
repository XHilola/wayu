import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Events } from '../../events.entity';
import { GetOneEventsXRequest } from './get-one-events-x-request';
import { GetOneEventsXResponse } from './get-one-events-x-response';

@QueryHandler(GetOneEventsXRequest)
export class GetOneEventsXHandler implements IQueryHandler<GetOneEventsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneEventsXRequest): Promise<GetOneEventsXResponse> {
    const event = await Events.findOne({
      where: { id: query.id },
      relations: ['category'],
    });
    if (!event)
      throw new NotFoundException('Event not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneEventsXResponse, event, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${event.image}`;
    return res;
  }
}