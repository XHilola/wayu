import { UpdateFaqsRequest } from './update-faqs-request';
import { Faqs } from '../../faqs.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFaqsResponse } from './update-faqs-response';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { Tags } from '../../../../news/tags/tags.entity';

@Injectable()
@CommandHandler(UpdateFaqsRequest)
export class UpdateFaqsHandler implements ICommandHandler<UpdateFaqsRequest> {
  async execute(req: UpdateFaqsRequest): Promise<UpdateFaqsResponse> {
    const faq = await Faqs.findOne({ where: { id: req.id }, relations: ['tags'] });
    if (!faq) throw new NotFoundException('Faq not found');

    if (req.question !== undefined) faq.question = req.question;
    if (req.answer !== undefined) faq.answer = req.answer;
    if (req.tagIds !== undefined) faq.tags = await Tags.findBy({ id: In(req.tagIds) });

    await Faqs.save(faq);
    return plainToInstance(UpdateFaqsResponse, faq, { excludeExtraneousValues: true });
  }
}
