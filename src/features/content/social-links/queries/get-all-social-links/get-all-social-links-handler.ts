import { GetAllSocialLinksRequest } from './get-all-social-links-request';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSocialLinksResponse } from './get-all-social-links-response';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';

@Injectable()
@QueryHandler(GetAllSocialLinksRequest)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksRequest> {
  async execute(): Promise<GetAllSocialLinksResponse[]> {
    const socialLinks = await SocialLinks.find();
    return plainToInstance(GetAllSocialLinksResponse, socialLinks, { excludeExtraneousValues: true });
  }
}
