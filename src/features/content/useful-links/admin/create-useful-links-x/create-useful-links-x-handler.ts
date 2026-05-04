import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';
import { CreateUsefulLinksXCommand } from './create-useful-links-x-command';
import { CreateUsefulLinksXResponse } from './create-useful-links-x-response';

@CommandHandler(CreateUsefulLinksXCommand)
export class CreateUsefulLinksXHandler implements ICommandHandler<CreateUsefulLinksXCommand> {
  async execute(cmd: CreateUsefulLinksXCommand): Promise<CreateUsefulLinksXResponse> {
    const usefulLink = UsefulLinks.create({ title: cmd.title, icon: cmd.icon.path, link: cmd.link });
    await UsefulLinks.save(usefulLink);
    return plainToInstance(CreateUsefulLinksXResponse, usefulLink, { excludeExtraneousValues: true });
  }
}