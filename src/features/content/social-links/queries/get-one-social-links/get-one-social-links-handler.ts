import { GetOneSocialLinksRequest } from './get-one-social-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneSocialLinksResponse } from './get-one-social-links-response';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';

@Injectable()
@QueryHandler(GetOneSocialLinksRequest)
export class GetOneSocialLinksHandler implements IQueryHandler<GetOneSocialLinksRequest> {
  async execute(req: GetOneSocialLinksRequest): Promise<GetOneSocialLinksResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: req.id });
    if (!socialLink) throw new NotFoundException('Social link not found');
    return plainToInstance(GetOneSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
  }
}
