import { CreateSocialLinksRequest } from './create-social-links-request';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSocialLinksResponse } from './create-social-links-response';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';

@Injectable()
@CommandHandler(CreateSocialLinksRequest)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksRequest> {
  async execute(req: CreateSocialLinksRequest): Promise<CreateSocialLinksResponse> {
    const socialLink = SocialLinks.create({ title: req.title, icon: req.icon, link: req.link });
    await SocialLinks.save(socialLink);
    return plainToInstance(CreateSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
  }
}
