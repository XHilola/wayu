import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Questions } from '../../questions.entity';
import { CreateQuestionsResponse } from './create-questions-response';
import { CreateQuestionsRequest } from './create-questions-request';

@Injectable()
@CommandHandler(CreateQuestionsRequest)
export class CreateQuestionsHandler implements ICommandHandler<CreateQuestionsRequest> {
  async execute(cmd: CreateQuestionsRequest): Promise<CreateQuestionsResponse> {
    const question = Questions.create(cmd);
    await Questions.save(question);
    return plainToInstance(CreateQuestionsResponse, question, { excludeExtraneousValues: true });
  }
}