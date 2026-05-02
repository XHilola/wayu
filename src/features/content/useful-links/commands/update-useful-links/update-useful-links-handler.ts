import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UsefulLinks } from '../../usefulLinks.entity';
import { UpdateUsefulLinksCommand } from './update-useful-links-command';
import { UpdateUsefulLinksResponse } from './update-useful-links-response';

@CommandHandler(UpdateUsefulLinksCommand)
export class UpdateUsefulLinksHandler implements ICommandHandler<UpdateUsefulLinksCommand> {
  async execute(cmd: UpdateUsefulLinksCommand): Promise<UpdateUsefulLinksResponse> {
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
    return plainToInstance(UpdateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}