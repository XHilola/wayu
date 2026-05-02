import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorRequest } from './update-author-request';
import { UpdateAuthorResponse } from './update-author-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateAuthorRequest)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorRequest> {
  async execute(cmd: UpdateAuthorRequest): Promise<UpdateAuthorResponse> {
    const author=await Authors.findOneBy({id:cmd.id})
    if (!author)
      throw new BadRequestException("Author is not found")
    author.fullName=cmd.fullName
    await Authors.save(author)
    return plainToInstance(UpdateAuthorResponse,author,{excludeExtraneousValues:true})
  }
}