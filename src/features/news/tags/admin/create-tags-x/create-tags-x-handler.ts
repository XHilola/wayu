import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { CreateTagsXRequest } from './create-tags-x-request';
import { CreateTagsXResponse } from './create-tags-x-response';

@Injectable()
@CommandHandler(CreateTagsXRequest)
export class CreateTagsXHandler implements ICommandHandler<CreateTagsXRequest> {
  async execute(cmd: CreateTagsXRequest): Promise<CreateTagsXResponse> {
    const existing = await Tags.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('Tag already exists');
    const tag = Tags.create(cmd);
    await Tags.save(tag);
    return plainToInstance(CreateTagsXResponse, tag, { excludeExtraneousValues: true });
  }
}