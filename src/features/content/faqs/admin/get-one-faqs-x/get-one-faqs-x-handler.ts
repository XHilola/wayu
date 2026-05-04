import { GetOneFaqsXRequest } from './get-one-faqs-x-request';
import { Faqs } from '../../faqs.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneFaqsXResponse } from './get-one-faqs-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneFaqsXRequest)
export class GetOneFaqsXHandler implements IQueryHandler<GetOneFaqsXRequest> {
  async execute(req: GetOneFaqsXRequest): Promise<GetOneFaqsXResponse> {
    const faq = await Faqs.findOne({ where: { id: req.id }, relations: ['tags'] });
    if (!faq) throw new NotFoundException('Faq not found');
    return plainToInstance(GetOneFaqsXResponse, faq, { excludeExtraneousValues: true });
  }
}
