import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Tags } from '../../tags.entity';
import { DeleteTagsRequest } from './delete-tags-request';

@Injectable()
@CommandHandler(DeleteTagsRequest)
export class DeleteTagsHandler implements ICommandHandler<DeleteTagsRequest> {
  async execute(cmd: DeleteTagsRequest): Promise<void> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    await Tags.remove(tag);
  }
}