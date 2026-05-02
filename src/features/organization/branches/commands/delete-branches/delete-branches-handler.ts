import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Branches } from '../../branches.entity';
import { DeleteBranchesRequest } from './delete-branches-request';

@Injectable()
@CommandHandler(DeleteBranchesRequest)
export class DeleteBranchesHandler implements ICommandHandler<DeleteBranchesRequest> {
  async execute(cmd: DeleteBranchesRequest): Promise<void> {
    const branch = await Branches.findOneBy({ id: cmd.id });
    if (!branch) throw new NotFoundException('Branch not found');
    await Branches.remove(branch);
  }
}