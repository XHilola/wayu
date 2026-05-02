import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { News } from '../../news.entity';
import { CreateNewsCommand } from './create-news-command';
import { CreateNewsResponse } from './create-news-response';
import { Tags } from '../../../tags/tags.entity';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  async execute(cmd: CreateNewsCommand): Promise<CreateNewsResponse> {
    const existing = await News.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('News with this title already exists');
    const news = News.create({
      categoryId: cmd.categoryId,
      countryId: cmd.countryId,
      title: cmd.title,
      image: cmd.image.path,
      date: cmd.date,
      content: cmd.content,
    });
    if (cmd.tagIds?.length) {
      news.tags = await Tags.findBy({ id: In(cmd.tagIds) });
    }
    await News.save(news);
    return plainToInstance(CreateNewsResponse, news, { excludeExtraneousValues: true });
  }
}