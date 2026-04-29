import { CreateFaqsRequest } from './create-faqs-request';
import { Faqs } from '../../faqs.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFaqsResponse } from './create-faqs-response';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { Tags } from '../../../../news/entities/tags.entity';

@Injectable()
@CommandHandler(CreateFaqsRequest)
export class CreateFaqsHandler implements ICommandHandler<CreateFaqsRequest> {
  async execute(req: CreateFaqsRequest): Promise<CreateFaqsResponse> {
    const exists = await Faqs.findOneBy({ question: req.question });
    if (exists) throw new BadRequestException('Faq with this question already exists');

    const tags = await Tags.findBy({ id: In(req.tagIds) });

    const faq = Faqs.create({
      question: req.question,
      answer: req.answer,
      tags,
    });
    await Faqs.save(faq);
    return plainToInstance(CreateFaqsResponse, faq, { excludeExtraneousValues: true });
  }
}
