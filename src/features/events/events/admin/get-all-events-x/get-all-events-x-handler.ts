import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Events } from '../../events.entity';
import { GetAllEventsXRequest } from './get-all-events-x-request';
import { GetAllEventsXResponse } from './get-all-events-x-response';

@QueryHandler(GetAllEventsXRequest)
export class GetAllEventsXHandler implements IQueryHandler<GetAllEventsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllEventsXRequest): Promise<GetAllEventsXResponse[]> {
    const events = await Events.find({ relations: ['category'] });
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return events.map((event) => {
      const res = plainToInstance(GetAllEventsXResponse, event, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${event.image}`;
      return res;
    });
  }
}