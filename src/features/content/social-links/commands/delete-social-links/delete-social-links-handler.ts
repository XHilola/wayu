import { DeleteSocialLinksRequest } from './delete-social-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SocialLinks } from '../../socialLinks.entity';

@Injectable()
@CommandHandler(DeleteSocialLinksRequest)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksRequest> {
  async execute(req: DeleteSocialLinksRequest): Promise<void> {
    const socialLink = await SocialLinks.findOneBy({ id: req.id });
    if (!socialLink) throw new NotFoundException('Social link not found');
    await SocialLinks.remove(socialLink);
  }
}
