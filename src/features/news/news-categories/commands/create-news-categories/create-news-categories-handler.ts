import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { CreateNewsCategoriesResponse } from './create-news-categories-response';
import { CreateNewsCategoriesRequest } from './create-news-categories-request';

@Injectable()
@CommandHandler(CreateNewsCategoriesRequest)
export class CreateNewsCategoriesHandler implements ICommandHandler<CreateNewsCategoriesRequest> {
  async execute(cmd: CreateNewsCategoriesRequest): Promise<CreateNewsCategoriesResponse> {
    const existing = await NewsCategories.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('News category already exists');
    const category = NewsCategories.create(cmd);
    await NewsCategories.save(category);
    return plainToInstance(CreateNewsCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}