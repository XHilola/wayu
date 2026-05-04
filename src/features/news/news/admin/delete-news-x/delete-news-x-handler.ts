import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { News } from '../../news.entity';
import { DeleteNewsXRequest } from './delete-news-x-request';

@Injectable()
@CommandHandler(DeleteNewsXRequest)
export class DeleteNewsXHandler implements ICommandHandler<DeleteNewsXRequest> {
  async execute(cmd: DeleteNewsXRequest): Promise<void> {
    const news = await News.findOneBy({ id: cmd.id });
    if (!news) throw new NotFoundException('News not found');
    await News.remove(news);
  }
}