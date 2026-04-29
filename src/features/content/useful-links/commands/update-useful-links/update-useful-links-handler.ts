import { UpdateUsefulLinksRequest } from './update-useful-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUsefulLinksResponse } from './update-useful-links-response';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@CommandHandler(UpdateUsefulLinksRequest)
export class UpdateUsefulLinksHandler implements ICommandHandler<UpdateUsefulLinksRequest> {
  async execute(req: UpdateUsefulLinksRequest): Promise<UpdateUsefulLinksResponse> {
    const usefulLink = await UsefulLinks.findOneBy({ id: req.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');

    if (req.title !== undefined) usefulLink.title = req.title;
    if (req.icon !== undefined)  usefulLink.icon  = req.icon;
    if (req.link !== undefined)  usefulLink.link  = req.link;

    await UsefulLinks.save(usefulLink);
    return plainToInstance(UpdateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}
