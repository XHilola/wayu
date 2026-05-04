import { GetAllFaqsXRequest } from './get-all-faqs-x-request';
import { Faqs } from '../../faqs.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFaqsXResponse } from './get-all-faqs-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllFaqsXRequest)
export class GetAllFaqsXHandler implements IQueryHandler<GetAllFaqsXRequest> {
  async execute(): Promise<GetAllFaqsXResponse[]> {
    const faqs = await Faqs.find({ relations: ['tags'] });
    return plainToInstance(GetAllFaqsXResponse, faqs, { excludeExtraneousValues: true });
  }
}
