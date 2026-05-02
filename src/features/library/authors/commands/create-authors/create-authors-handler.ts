import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorsResponse } from './create-authors-response';
import { CreateAuthorsRequest } from './create-authors-request';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateAuthorsRequest)
export class CreateAuthorsHandler implements ICommandHandler<CreateAuthorsRequest> {
  async execute(cmd: CreateAuthorsRequest): Promise<CreateAuthorsResponse> {
    const author=await Authors.findOneBy({fullName:cmd.fullName})
    if (author)
      throw new BadRequestException("Author already exists")
    const newAuthor= Authors.create(cmd)
    await Authors.save(newAuthor)
    return plainToInstance(CreateAuthorsResponse,newAuthor,{excludeExtraneousValues:true})
  }
}