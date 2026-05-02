import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorsRequest } from './delete-authors-request';
import { Authors } from '../../authors.entity';

@Injectable()
@CommandHandler(DeleteAuthorsRequest)
export class DeleteAuthorsHandler implements ICommandHandler<DeleteAuthorsRequest> {
  async execute(cmd: DeleteAuthorsRequest): Promise<void> {
    const author=await Authors.findOneBy({id:cmd.id})
    if (!author)
      throw new NotFoundException("Author is not found")
    await Authors.remove(author)
  }
}