import { DeleteUsefulLinksRequest } from './delete-useful-links-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@CommandHandler(DeleteUsefulLinksRequest)
export class DeleteUsefulLinksHandler implements ICommandHandler<DeleteUsefulLinksRequest> {
  async execute(req: DeleteUsefulLinksRequest): Promise<void> {
    const usefulLink = await UsefulLinks.findOneBy({ id: req.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');
    await UsefulLinks.remove(usefulLink);
  }
}
