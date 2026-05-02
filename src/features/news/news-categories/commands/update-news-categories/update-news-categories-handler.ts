import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { UpdateNewsCategoriesResponse } from './update-news-categories-response';
import { UpdateNewsCategoriesRequest } from './update-news-categories-request';
@Injectable()
@CommandHandler(UpdateNewsCategoriesRequest)
export class UpdateNewsCategoriesHandler implements ICommandHandler<UpdateNewsCategoriesRequest> {
  async execute(cmd: UpdateNewsCategoriesRequest): Promise<UpdateNewsCategoriesResponse> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    category.title = cmd.title;
    await NewsCategories.save(category);
    return plainToInstance(UpdateNewsCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}