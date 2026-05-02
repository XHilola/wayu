import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLinks } from '../../socialLinks.entity';
import { GetOneSocialLinksRequest } from './get-one-social-links-request';
import { GetOneSocialLinksResponse } from './get-one-social-links-response';

@QueryHandler(GetOneSocialLinksRequest)
export class GetOneSocialLinksHandler implements IQueryHandler<GetOneSocialLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneSocialLinksRequest): Promise<GetOneSocialLinksResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: query.id });
    if (!socialLink) throw new NotFoundException('Social link not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${socialLink.icon}`;
    return res;
  }
}