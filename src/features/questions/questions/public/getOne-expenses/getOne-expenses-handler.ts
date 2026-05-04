import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Questions } from '../../questions.entity';
import { GetOneQuestionsRequest } from './getOne-expenses-request';
import { GetOneQuestionsResponse } from './getOne-expenses-response';

@Injectable()
@QueryHandler(GetOneQuestionsRequest)
export class GetOneQuestionsHandler implements IQueryHandler<GetOneQuestionsRequest> {
  async execute(query: GetOneQuestionsRequest): Promise<GetOneQuestionsResponse> {
    const question = await Questions.findOneBy({ id: query.id });
    if (!question) throw new NotFoundException('Question not found');
    return plainToInstance(GetOneQuestionsResponse, question, { excludeExtraneousValues: true });
  }
}