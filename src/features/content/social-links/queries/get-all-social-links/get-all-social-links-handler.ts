import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLinks } from '../../socialLinks.entity';
import { GetAllSocialLinksRequest } from './get-all-social-links-request';
import { GetAllSocialLinksResponse } from './get-all-social-links-response';

@QueryHandler(GetAllSocialLinksRequest)
export class GetAllSocialLinksHandler implements IQueryHandler<GetAllSocialLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllSocialLinksRequest): Promise<GetAllSocialLinksResponse[]> {
    const socialLinks = await SocialLinks.find();
    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    return socialLinks.map((socialLink) => {
      const res = plainToInstance(GetAllSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${socialLink.icon}`;
      return res;
    });
  }
}