import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLinks } from '../../socialLinks.entity';
import { GetOneSocialLinksXRequest } from './get-one-social-links-x-request';
import { GetOneSocialLinksXResponse } from './get-one-social-links-x-response';

@QueryHandler(GetOneSocialLinksXRequest)
export class GetOneSocialLinksXHandler implements IQueryHandler<GetOneSocialLinksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneSocialLinksXRequest): Promise<GetOneSocialLinksXResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: query.id });
    if (!socialLink) throw new NotFoundException('Social link not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneSocialLinksXResponse, socialLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${socialLink.icon}`;
    return res;
  }
}