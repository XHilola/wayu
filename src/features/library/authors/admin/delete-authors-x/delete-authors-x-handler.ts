import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorsXRequest } from './delete-authors-x-request';
import { Authors } from '../../authors.entity';

@Injectable()
@CommandHandler(DeleteAuthorsXRequest)
export class DeleteAuthorsXHandler implements ICommandHandler<DeleteAuthorsXRequest> {
  async execute(cmd: DeleteAuthorsXRequest): Promise<void> {
    const author=await Authors.findOneBy({id:cmd.id})
    if (!author)
      throw new NotFoundException("Author is not found")
    await Authors.remove(author)
  }
}