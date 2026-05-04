import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorsXResponse } from './create-authors-x-response';
import { CreateAuthorsXRequest } from './create-authors-x-request';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateAuthorsXRequest)
export class CreateAuthorsXHandler implements ICommandHandler<CreateAuthorsXRequest> {
  async execute(cmd: CreateAuthorsXRequest): Promise<CreateAuthorsXResponse> {
    const author=await Authors.findOneBy({fullName:cmd.fullName})
    if (author)
      throw new BadRequestException("Author already exists")
    const newAuthor= Authors.create(cmd)
    await Authors.save(newAuthor)
    return plainToInstance(CreateAuthorsXResponse,newAuthor,{excludeExtraneousValues:true})
  }
}