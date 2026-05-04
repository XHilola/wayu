import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../newsCategories.entity';
import { CreateNewsCategoriesXResponse } from './create-news-categories-x-response';
import { CreateNewsCategoriesXRequest } from './create-news-categories-x-request';

@Injectable()
@CommandHandler(CreateNewsCategoriesXRequest)
export class CreateNewsCategoriesXHandler implements ICommandHandler<CreateNewsCategoriesXRequest> {
  async execute(cmd: CreateNewsCategoriesXRequest): Promise<CreateNewsCategoriesXResponse> {
    const existing = await NewsCategories.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('News category already exists');
    const category = NewsCategories.create(cmd);
    await NewsCategories.save(category);
    return plainToInstance(CreateNewsCategoriesXResponse, category, { excludeExtraneousValues: true });
  }
}