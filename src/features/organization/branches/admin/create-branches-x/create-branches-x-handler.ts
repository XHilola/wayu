import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { CreateBranchesXRequest } from './create-branches-x-request';
import { CreateBranchesXResponse } from './create-branches-x-response';

@Injectable()
@CommandHandler(CreateBranchesXRequest)
export class CreateBranchesXHandler implements ICommandHandler<CreateBranchesXRequest> {
  async execute(cmd: CreateBranchesXRequest): Promise<CreateBranchesXResponse> {
    const branch = Branches.create(cmd);
    await Branches.save(branch);
    return plainToInstance(CreateBranchesXResponse, branch, { excludeExtraneousValues: true });
  }
}