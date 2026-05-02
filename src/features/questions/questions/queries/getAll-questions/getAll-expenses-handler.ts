import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Questions } from '../../questions.entity';
import { GetAllQuestionsRequest } from './getAll-expenses-request';
import { GetAllQuestionsResponse } from './getAll-expenses-response';

@Injectable()
@QueryHandler(GetAllQuestionsRequest)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsRequest> {
  async execute(query: GetAllQuestionsRequest): Promise<GetAllQuestionsResponse[]> {
    const questions = await Questions.find();
    return plainToInstance(GetAllQuestionsResponse, questions, { excludeExtraneousValues: true });
  }
}