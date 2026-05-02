import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';
import { CreateUsefulLinksCommand } from './create-useful-links-command';
import { CreateUsefulLinksResponse } from './create-useful-links-response';

@CommandHandler(CreateUsefulLinksCommand)
export class CreateUsefulLinksHandler implements ICommandHandler<CreateUsefulLinksCommand> {
  async execute(cmd: CreateUsefulLinksCommand): Promise<CreateUsefulLinksResponse> {
    const usefulLink = UsefulLinks.create({ title: cmd.title, icon: cmd.icon.path, link: cmd.link });
    await UsefulLinks.save(usefulLink);
    return plainToInstance(CreateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}