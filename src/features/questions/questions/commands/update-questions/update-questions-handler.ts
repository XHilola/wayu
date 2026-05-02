import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Questions } from '../../questions.entity';
import { UpdateQuestionsRequest } from './update-questions-request';
import { UpdateQuestionsResponse } from './update-questions-response';

@Injectable()
@CommandHandler(UpdateQuestionsRequest)
export class UpdateQuestionsHandler implements ICommandHandler<UpdateQuestionsRequest> {
  async execute(cmd: UpdateQuestionsRequest): Promise<UpdateQuestionsResponse> {
    const question = await Questions.findOneBy({ id: cmd.id });
    if (!question) throw new NotFoundException('Question not found');
    question.fullName = cmd.fullName;
    question.phoneNumber = cmd.phoneNumber;
    question.question = cmd.question;
    question.status = cmd.status;
    await Questions.save(question);
    return plainToInstance(UpdateQuestionsResponse, question, { excludeExtraneousValues: true });
  }
}