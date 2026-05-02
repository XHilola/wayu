import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLinks } from '../../usefulLinks.entity';
import { GetAllUsefulLinksRequest } from './get-all-useful-links-request';
import { GetAllUsefulLinksResponse } from './get-all-useful-links-response';

@QueryHandler(GetAllUsefulLinksRequest)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllUsefulLinksRequest): Promise<GetAllUsefulLinksResponse[]> {
    const usefulLinks = await UsefulLinks.find();
    const baseUrl = this.config.get<string>('BASE_URL');
    return usefulLinks.map((usefulLink) => {
      const res = plainToInstance(GetAllUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${usefulLink.icon}`;
      return res;
    });
  }
}