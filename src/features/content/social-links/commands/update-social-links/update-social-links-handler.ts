import { UpdateSocialLinksRequest } from './update-social-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSocialLinksResponse } from './update-social-links-response';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';

@Injectable()
@CommandHandler(UpdateSocialLinksRequest)
export class UpdateSocialLinksHandler implements ICommandHandler<UpdateSocialLinksRequest> {
  async execute(req: UpdateSocialLinksRequest): Promise<UpdateSocialLinksResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: req.id });
    if (!socialLink) throw new NotFoundException('Social link not found');

    if (req.title !== undefined) socialLink.title = req.title;
    if (req.icon !== undefined)  socialLink.icon  = req.icon;
    if (req.link !== undefined)  socialLink.link  = req.link;

    await SocialLinks.save(socialLink);
    return plainToInstance(UpdateSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
  }
}
