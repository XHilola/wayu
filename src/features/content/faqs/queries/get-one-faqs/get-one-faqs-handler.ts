import { GetOneFaqsRequest } from './get-one-faqs-request';
import { Faqs } from '../../faqs.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneFaqsResponse } from './get-one-faqs-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneFaqsRequest)
export class GetOneFaqsHandler implements IQueryHandler<GetOneFaqsRequest> {
  async execute(req: GetOneFaqsRequest): Promise<GetOneFaqsResponse> {
    const faq = await Faqs.findOne({ where: { id: req.id }, relations: ['tags'] });
    if (!faq) throw new NotFoundException('Faq not found');
    return plainToInstance(GetOneFaqsResponse, faq, { excludeExtraneousValues: true });
  }
}
