import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { News } from '../../news.entity';
import { DeleteNewsRequest } from './delete-news-request';

@Injectable()
@CommandHandler(DeleteNewsRequest)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsRequest> {
  async execute(cmd: DeleteNewsRequest): Promise<void> {
    const news = await News.findOneBy({ id: cmd.id });
    if (!news) throw new NotFoundException('News not found');
    await News.remove(news);
  }
}