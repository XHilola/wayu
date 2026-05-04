import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import fs from 'fs';
import { News } from '../../news.entity';
import { UpdateNewsXCommand } from './update-news-x-command';
import { UpdateNewsXResponse } from './update-news-x-response';
import { Tags } from '../../../tags/tags.entity';

@CommandHandler(UpdateNewsXCommand)
export class UpdateNewsXHandler implements ICommandHandler<UpdateNewsXCommand> {
  async execute(cmd: UpdateNewsXCommand): Promise<UpdateNewsXResponse> {
    const news = await News.findOne({ where: { id: cmd.id }, relations: ['tags'] });
    if (!news) throw new NotFoundException('News not found');
    if (cmd.categoryId) news.categoryId = cmd.categoryId;
    if (cmd.countryId)  news.countryId  = cmd.countryId;
    if (cmd.title)      news.title      = cmd.title;
    if (cmd.date)       news.date       = cmd.date;
    if (cmd.content)    news.content    = cmd.content;
    if (cmd.image) {
      if (news.image && fs.existsSync(news.image)) fs.rmSync(news.image);
      news.image = cmd.image.path;
    }
    if (cmd.tagIds !== undefined) {
      news.tags = cmd.tagIds.length ? await Tags.findBy({ id: In(cmd.tagIds) }) : [];
    }
    await News.save(news);
    return plainToInstance(UpdateNewsXResponse, news, { excludeExtraneousValues: true });
  }
}