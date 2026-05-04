import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { UpdateTagsXRequest } from './update-tags-x-request';
import { UpdateTagsXResponse } from './update-tags-X-response';

@Injectable()
@CommandHandler(UpdateTagsXRequest)
export class UpdateTagsXHandler implements ICommandHandler<UpdateTagsXRequest> {
  async execute(cmd: UpdateTagsXRequest): Promise<UpdateTagsXResponse> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    tag.title = cmd.title;
    await Tags.save(tag);
    return plainToInstance(UpdateTagsXResponse, tag, { excludeExtraneousValues: true });
  }
}