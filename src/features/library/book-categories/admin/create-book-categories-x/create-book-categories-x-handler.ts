import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCategoriesXRequest } from './create-book-categories-x-request';
import { CreateBookCategoriesXResponse } from './create-book-categories-x-response';
import { BookCategories } from '../../bookCategories.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateBookCategoriesXRequest)
export class CreateBookCategoriesXHandler implements ICommandHandler<CreateBookCategoriesXRequest> {
  async execute(cmd: CreateBookCategoriesXRequest): Promise<CreateBookCategoriesXResponse> {
    const exists = await BookCategories.findOneBy({ title: cmd.title });
    if (exists)
      throw new BadRequestException("BookCategory already exists")

    const newBC= BookCategories.create(cmd)
    await BookCategories.save(newBC)
    return plainToInstance(CreateBookCategoriesXResponse,newBC,{excludeExtraneousValues:true})
  }
}