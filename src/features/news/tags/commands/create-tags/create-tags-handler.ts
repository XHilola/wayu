import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { CreateTagsRequest } from './create-tags-request';
import { CreateTagsResponse } from './create-tags-response';

@Injectable()
@CommandHandler(CreateTagsRequest)
export class CreateTagsHandler implements ICommandHandler<CreateTagsRequest> {
  async execute(cmd: CreateTagsRequest): Promise<CreateTagsResponse> {
    const existing = await Tags.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('Tag already exists');
    const tag = Tags.create(cmd);
    await Tags.save(tag);
    return plainToInstance(CreateTagsResponse, tag, { excludeExtraneousValues: true });
  }
}