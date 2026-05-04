import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLinks } from '../../socialLinks.entity';
import { GetAllSocialLinksXRequest } from './get-all-social-links-x-request';
import { GetAllSocialLinksXResponse } from './get-all-social-links-x-response';

@QueryHandler(GetAllSocialLinksXRequest)
export class GetAllSocialLinksXHandler implements IQueryHandler<GetAllSocialLinksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllSocialLinksXRequest): Promise<GetAllSocialLinksXResponse[]> {
    const socialLinks = await SocialLinks.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return socialLinks.map((socialLink) => {
      const res = plainToInstance(GetAllSocialLinksXResponse, socialLink, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${socialLink.icon}`;
      return res;
    });
  }
}