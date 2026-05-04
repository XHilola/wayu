import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAuthorXRequest } from './update-author-x-request';
import { UpdateAuthorXResponse } from './update-author-x-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateAuthorXRequest)
export class UpdateAuthorXHandler implements ICommandHandler<UpdateAuthorXRequest> {
  async execute(cmd: UpdateAuthorXRequest): Promise<UpdateAuthorXResponse> {
    const author=await Authors.findOneBy({id:cmd.id})
    if (!author)
      throw new BadRequestException("Author is not found")
    author.fullName=cmd.fullName
    await Authors.save(author)
    return plainToInstance(UpdateAuthorXResponse,author,{excludeExtraneousValues:true})
  }
}