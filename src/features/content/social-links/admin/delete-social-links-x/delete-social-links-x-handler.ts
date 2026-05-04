import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { SocialLinks } from '../../socialLinks.entity';
import { DeleteSocialLinksXRequest } from './delete-social-links-x-request';

@CommandHandler(DeleteSocialLinksXRequest)
export class DeleteSocialLinksXHandler implements ICommandHandler<DeleteSocialLinksXRequest> {
  async execute(cmd: DeleteSocialLinksXRequest): Promise<void> {
    const socialLink = await SocialLinks.findOneBy({ id: cmd.id });
    if (!socialLink)
      throw new NotFoundException('Social link not found');
    if (socialLink.icon && fs.existsSync(socialLink.icon))
      fs.rmSync(socialLink.icon);
    await SocialLinks.remove(socialLink);
  }
}