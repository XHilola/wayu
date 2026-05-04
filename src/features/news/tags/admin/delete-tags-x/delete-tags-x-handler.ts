import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Tags } from '../../tags.entity';
import { DeleteTagsXRequest } from './delete-tags-x-request';

@Injectable()
@CommandHandler(DeleteTagsXRequest)
export class DeleteTagsXHandler implements ICommandHandler<DeleteTagsXRequest> {
  async execute(cmd: DeleteTagsXRequest): Promise<void> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    await Tags.remove(tag);
  }
}