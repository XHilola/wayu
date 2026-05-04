import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Branches } from '../../branches.entity';
import { DeleteBranchesXRequest } from './delete-branches-x-request';

@Injectable()
@CommandHandler(DeleteBranchesXRequest)
export class DeleteBranchesXHandler implements ICommandHandler<DeleteBranchesXRequest> {
  async execute(cmd: DeleteBranchesXRequest): Promise<void> {
    const branch = await Branches.findOneBy({ id: cmd.id });
    if (!branch) throw new NotFoundException('Branch not found');
    await Branches.remove(branch);
  }
}