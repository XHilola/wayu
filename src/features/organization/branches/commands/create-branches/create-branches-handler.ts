import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { CreateBranchesRequest } from './create-branches-request';
import { CreateBranchesResponse } from './create-branches-response';

@Injectable()
@CommandHandler(CreateBranchesRequest)
export class CreateBranchesHandler implements ICommandHandler<CreateBranchesRequest> {
  async execute(cmd: CreateBranchesRequest): Promise<CreateBranchesResponse> {
    const branch = Branches.create(cmd);
    await Branches.save(branch);
    return plainToInstance(CreateBranchesResponse, branch, { excludeExtraneousValues: true });
  }
}