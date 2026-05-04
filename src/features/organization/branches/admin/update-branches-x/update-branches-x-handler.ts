import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { UpdateBranchesXRequest } from './update-branches-x-request';
import { UpdateBranchesXResponse } from './update-branches-x-response';

@Injectable()
@CommandHandler(UpdateBranchesXRequest)
export class UpdateBranchesXHandler implements ICommandHandler<UpdateBranchesXRequest> {
  async execute(cmd: UpdateBranchesXRequest): Promise<UpdateBranchesXResponse> {
    const branch = await Branches.findOneBy({ id: cmd.id });
    if (!branch) throw new NotFoundException('Branch not found');
    branch.countryId = cmd.countryId;
    branch.representativeId = cmd.representativeId;
    branch.city = cmd.city;
    branch.latitude = cmd.latitude;
    branch.longitude = cmd.longitude;
    branch.phoneNumber = cmd.phoneNumber;
    await Branches.save(branch);
    return plainToInstance(UpdateBranchesXResponse, branch, { excludeExtraneousValues: true });
  }
}