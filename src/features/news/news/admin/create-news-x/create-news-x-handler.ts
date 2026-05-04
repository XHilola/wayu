import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { News } from '../../news.entity';
import { CreateNewsXCommand } from './create-news-x-command';
import { CreateNewsXResponse } from './create-news-x-response';
import { Tags } from '../../../tags/tags.entity';

@CommandHandler(CreateNewsXCommand)
export class CreateNewsXHandler implements ICommandHandler<CreateNewsXCommand> {
  async execute(cmd: CreateNewsXCommand): Promise<CreateNewsXResponse> {
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
    return plainToInstance(CreateNewsXResponse, news, { excludeExtraneousValues: true });
  }
}