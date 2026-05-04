import { DeleteFaqsRequest } from './delete-faqs-request';
import { Faqs } from '../../faqs.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteFaqsRequest)
export class DeleteFaqsHandler implements ICommandHandler<DeleteFaqsRequest> {
  async execute(req: DeleteFaqsRequest): Promise<void> {
    const faq = await Faqs.findOneBy({ id: req.id });
    if (!faq) throw new NotFoundException('Faq not found');
    await Faqs.remove(faq);
  }
}
