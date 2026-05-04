import { DeleteUsefulLinksXRequest } from './delete-useful-links-x-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@CommandHandler(DeleteUsefulLinksXRequest)
export class DeleteUsefulLinksXHandler implements ICommandHandler<DeleteUsefulLinksXRequest> {
  async execute(req: DeleteUsefulLinksXRequest): Promise<void> {
    const usefulLink = await UsefulLinks.findOneBy({ id: req.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');
    await UsefulLinks.remove(usefulLink);
  }
}
