import { GetOneQuestionsXRequest } from './getOne-expenses-x-request';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneQuestionsXResponse } from './getOne-expenses-x-response';
import { Questions } from '../../questions.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneQuestionsXRequest)
export class GetOneQuestionsXHandler implements IQueryHandler<GetOneQuestionsXRequest> {
  async execute(query: GetOneQuestionsXRequest): Promise<GetOneQuestionsXResponse> {
    const question = await Questions.findOneBy({ id: query.id });
    if (!question) throw new NotFoundException('Question not found');
    return plainToInstance(GetOneQuestionsXResponse, question, { excludeExtraneousValues: true });
  }
}