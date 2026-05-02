import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { UpdateTagsRequest } from './update-tags-request';
import { UpdateTagsResponse } from './update-tags-response';

@Injectable()
@CommandHandler(UpdateTagsRequest)
export class UpdateTagsHandler implements ICommandHandler<UpdateTagsRequest> {
  async execute(cmd: UpdateTagsRequest): Promise<UpdateTagsResponse> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    tag.title = cmd.title;
    await Tags.save(tag);
    return plainToInstance(UpdateTagsResponse, tag, { excludeExtraneousValues: true });
  }
}