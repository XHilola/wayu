import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { UpdateBranchesRequest } from './update-branches-request';
import { UpdateBranchesResponse } from './update-branches-response';

@Injectable()
@CommandHandler(UpdateBranchesRequest)
export class UpdateBranchesHandler implements ICommandHandler<UpdateBranchesRequest> {
  async execute(cmd: UpdateBranchesRequest): Promise<UpdateBranchesResponse> {
    const branch = await Branches.findOneBy({ id: cmd.id });
    if (!branch) throw new NotFoundException('Branch not found');
    branch.countryId = cmd.countryId;
    branch.representativeId = cmd.representativeId;
    branch.city = cmd.city;
    branch.latitude = cmd.latitude;
    branch.longitude = cmd.longitude;
    branch.phoneNumber = cmd.phoneNumber;
    await Branches.save(branch);
    return plainToInstance(UpdateBranchesResponse, branch, { excludeExtraneousValues: true });
  }
}