import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLinks } from '../../usefulLinks.entity';
import { GetAllUsefulLinksXRequest } from './get-all-useful-links-x-request';
import { GetAllUsefulLinksXResponse } from './get-all-useful-links-x-response';

@QueryHandler(GetAllUsefulLinksXRequest)
export class GetAllUsefulLinksXHandler implements IQueryHandler<GetAllUsefulLinksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllUsefulLinksXRequest): Promise<GetAllUsefulLinksXResponse[]> {
    const usefulLinks = await UsefulLinks.find();
    const baseUrl = this.config.get<string>('BASE_URL');
    return usefulLinks.map((usefulLink) => {
      const res = plainToInstance(GetAllUsefulLinksXResponse, usefulLink, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${usefulLink.icon}`;
      return res;
    });
  }
}