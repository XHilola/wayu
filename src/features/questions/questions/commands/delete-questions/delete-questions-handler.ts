import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Questions } from '../../questions.entity';
import { DeleteQuestionsRequest } from './delete-questions-request';

@Injectable()
@CommandHandler(DeleteQuestionsRequest)
export class DeleteQuestionsHandler implements ICommandHandler<DeleteQuestionsRequest> {
  async execute(cmd: DeleteQuestionsRequest): Promise<void> {
    const question = await Questions.findOneBy({ id: cmd.id });
    if (!question) throw new NotFoundException('Question not found');
    await Questions.remove(question);
  }
}