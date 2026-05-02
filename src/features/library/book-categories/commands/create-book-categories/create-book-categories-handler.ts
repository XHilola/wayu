import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCategoriesRequest } from './create-book-categories-request';
import { CreateBookCategoriesResponse } from './create-book-categories-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateBookCategoriesRequest)
export class CreateBookCategoriesHandler implements ICommandHandler<CreateBookCategoriesRequest> {
  async execute(cmd: CreateBookCategoriesRequest): Promise<CreateBookCategoriesResponse> {
    const exists = await BookCategories.findOneBy({ title: cmd.title });
    if (exists)
      throw new BadRequestException("BookCategory already exists")

    const newBC= BookCategories.create(cmd)
    await BookCategories.save(newBC)
    return plainToInstance(CreateBookCategoriesResponse,newBC,{excludeExtraneousValues:true})
  }
}