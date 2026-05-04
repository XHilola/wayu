import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLinks } from '../../usefulLinks.entity';
import { GetOneUsefulLinksXRequest } from './get-one-useful-links-x-request';
import { GetOneUsefulLinksXResponse } from './get-one-useful-links-x-response';

@QueryHandler(GetOneUsefulLinksXRequest)
export class GetOneUsefulLinksXHandler implements IQueryHandler<GetOneUsefulLinksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneUsefulLinksXRequest): Promise<GetOneUsefulLinksXResponse> {
    const usefulLink = await UsefulLinks.findOneBy({ id: query.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const res = plainToInstance(GetOneUsefulLinksXResponse, usefulLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${usefulLink.icon}`;
    return res;
  }
}