import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Faqs } from '../../faqs.entity';
import { GetAllFaqsXRequest } from './get-all-faqs-x-request';
import { GetAllFaqsXResponse } from './get-all-faqs-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllFaqsXRequest)
export class GetAllFaqsXHandler implements IQueryHandler<GetAllFaqsXRequest> {
  async execute(query: GetAllFaqsXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const [faqs, totalCount] = await Faqs.findAndCount({
      where: query.question ? { question: ILike(`%${query.question}%`) } : {},
      relations: ['tags'],
      skip,
      take: size,
    });

    const data = faqs.map((faq) =>
      plainToInstance(GetAllFaqsXResponse, faq, { excludeExtraneousValues: true }),
    );

    const totalPages = Math.ceil(totalCount / size);

    return {
      totalPages,
      previousPage: page > 1 ? page - 1 : undefined,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : undefined,
      totalCount,
      data,
    };
  }
}