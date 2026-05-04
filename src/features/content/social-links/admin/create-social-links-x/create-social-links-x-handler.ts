import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';
import { CreateSocialLinksXCommand } from './create-social-links-x-command';
import { CreateSocialLinksXResponse } from './create-social-links-x-response';

@CommandHandler(CreateSocialLinksXCommand)
export class CreateSocialLinksXHandler implements ICommandHandler<CreateSocialLinksXCommand> {
  async execute(cmd: CreateSocialLinksXCommand): Promise<CreateSocialLinksXResponse> {
    const post = SocialLinks.create({ title: cmd.title, icon: cmd.icon.path, link: cmd.link });
    await SocialLinks.save(post);
    return plainToInstance(CreateSocialLinksXResponse, post, { excludeExtraneousValues: true });
  }
}