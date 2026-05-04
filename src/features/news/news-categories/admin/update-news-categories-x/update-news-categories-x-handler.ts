import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { UpdateNewsCategoriesXResponse } from './update-news-categories-x-response';
import { UpdateNewsCategoriesXRequest } from './update-news-categories-x-request';
@Injectable()
@CommandHandler(UpdateNewsCategoriesXRequest)
export class UpdateNewsCategoriesXHandler implements ICommandHandler<UpdateNewsCategoriesXRequest> {
  async execute(cmd: UpdateNewsCategoriesXRequest): Promise<UpdateNewsCategoriesXResponse> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    category.title = cmd.title;
    await NewsCategories.save(category);
    return plainToInstance(UpdateNewsCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}