import { GetAllQuestionsXRequest } from './getAll-expenses-x-request';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllQuestionsXResponse } from './getAll-expenses-x-response';
import { Questions } from '../../questions.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllQuestionsXRequest)
export class GetAllQuestionsXHandler implements IQueryHandler<GetAllQuestionsXRequest> {
  async execute(query: GetAllQuestionsXRequest): Promise<GetAllQuestionsXResponse[]> {
    const questions = await Questions.find();
    return plainToInstance(GetAllQuestionsXResponse, questions, { excludeExtraneousValues: true });
  }
}