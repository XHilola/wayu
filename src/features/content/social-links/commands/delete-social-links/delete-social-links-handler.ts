import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { SocialLinks } from '../../socialLinks.entity';
import { DeleteSocialLinksRequest } from './delete-social-links-request';

@CommandHandler(DeleteSocialLinksRequest)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksRequest> {
  async execute(cmd: DeleteSocialLinksRequest): Promise<void> {
    const socialLink = await SocialLinks.findOneBy({ id: cmd.id });
    if (!socialLink)
      throw new NotFoundException('Social link not found');
    if (socialLink.icon && fs.existsSync(socialLink.icon))
      fs.rmSync(socialLink.icon);
    await SocialLinks.remove(socialLink);
  }
}