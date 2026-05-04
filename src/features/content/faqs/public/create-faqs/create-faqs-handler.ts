import { CreateFaqsRequest } from './create-faqs-request';
import { Faqs } from '../../faqs.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFaqsResponse } from './create-faqs-response';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../../news/tags/tags.entity';
import { In } from 'typeorm';

@Injectable()
@CommandHandler(CreateFaqsRequest)
export class CreateFaqsHandler implements ICommandHandler<CreateFaqsRequest> {
  async execute(command: CreateFaqsRequest) {
    const exists = await Faqs.findOneBy({ question: command.question });
    if (exists)
      throw new BadRequestException('FAQ with this question already exists');

    const tags = await Tags.findBy({ id: In(command.tagId) });

    const faq = Faqs.create({
      question: command.question,
      answer: command.answer,
      tags,
    });

    const savedFaq = await Faqs.save(faq);

    return plainToInstance(CreateFaqsResponse, savedFaq, {
      excludeExtraneousValues: true,
    });
  }
}
