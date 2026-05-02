import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Events } from '../../events.entity';
import { GetAllEventsRequest } from './get-all-events-request';
import { GetAllEventsResponse } from './get-all-events-response';

@QueryHandler(GetAllEventsRequest)
export class GetAllEventsHandler implements IQueryHandler<GetAllEventsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllEventsRequest): Promise<GetAllEventsResponse[]> {
    const events = await Events.find({ relations: ['category'] });
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return events.map((event) => {
      const res = plainToInstance(GetAllEventsResponse, event, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${event.image}`;
      return res;
    });
  }
}