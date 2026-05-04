import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UsefulLinks } from '../../usefulLinks.entity';
import { UpdateUsefulLinksXCommand } from './update-useful-links-x-command';
import { UpdateUsefulLinksXResponse } from './update-useful-links-x-response';

@CommandHandler(UpdateUsefulLinksXCommand)
export class UpdateUsefulLinksXHandler implements ICommandHandler<UpdateUsefulLinksXCommand> {
  async execute(cmd: UpdateUsefulLinksXCommand): Promise<UpdateUsefulLinksXResponse> {
    const usefulLink = await UsefulLinks.findOneBy({ id: cmd.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');
    if (cmd.title)
      usefulLink.title = cmd.title;
    if (cmd.link)
      usefulLink.link = cmd.link;
    if (cmd.icon) {
      if (usefulLink.icon && fs.existsSync(usefulLink.icon))
        fs.rmSync(usefulLink.icon);
      usefulLink.icon = cmd.icon.path;
    }
    await UsefulLinks.save(usefulLink);
    return plainToInstance(UpdateUsefulLinksXResponse, usefulLink, { excludeExtraneousValues: true });
  }
}