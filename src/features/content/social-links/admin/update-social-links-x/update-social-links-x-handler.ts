import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { SocialLinks } from '../../socialLinks.entity';
import { UpdateSocialLinksXCommand } from './update-social-links-x-command';
import { UpdateSocialLinksXResponse } from './update-social-links-x-response';

@CommandHandler(UpdateSocialLinksXCommand)
export class UpdateSocialLinksXHandler implements ICommandHandler<UpdateSocialLinksXCommand> {
  async execute(cmd: UpdateSocialLinksXCommand): Promise<UpdateSocialLinksXResponse> {
    const socialLink = await SocialLinks.findOneBy({ id: cmd.id });
    if (!socialLink) throw new NotFoundException('Social link not found');
    if (cmd.title)
      socialLink.title = cmd.title;
    if (cmd.link)
      socialLink.link = cmd.link;
    if (cmd.icon) {
      if (socialLink.icon && fs.existsSync(socialLink.icon))
        fs.rmSync(socialLink.icon);
      socialLink.icon = cmd.icon.path;
    }
    await SocialLinks.save(socialLink);
    return plainToInstance(UpdateSocialLinksXResponse, socialLink, { excludeExtraneousValues: true });
  }
}