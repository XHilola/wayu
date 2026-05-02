import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { SocialLinks } from '../../socialLinks.entity';
import { CreateSocialLinksCommand } from './create-social-links-command';
import { CreateSocialLinksResponse } from './create-social-links-response';

@CommandHandler(CreateSocialLinksCommand)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksCommand> {
  async execute(cmd: CreateSocialLinksCommand): Promise<CreateSocialLinksResponse> {
    const post = SocialLinks.create({ title: cmd.title, icon: cmd.icon.path, link: cmd.link });
    await SocialLinks.save(post);
    return plainToInstance(CreateSocialLinksResponse, post, { excludeExtraneousValues: true });
  }
}