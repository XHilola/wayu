import { GetAllFaqsRequest } from './get-all-faqs-request';
import { Faqs } from '../../faqs.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllFaqsResponse } from './get-all-faqs-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllFaqsRequest)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsRequest> {
  async execute(): Promise<GetAllFaqsResponse[]> {
    const faqs = await Faqs.find({ relations: ['tags'] });
    return plainToInstance(GetAllFaqsResponse, faqs, { excludeExtraneousValues: true });
  }
}
