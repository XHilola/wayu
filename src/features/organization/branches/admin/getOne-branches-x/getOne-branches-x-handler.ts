import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { GetOneBranchesXRequest } from './getOne-branches-x-request';
import { GetOneBranchesXResponse } from './getOne-branches-x-response';

@Injectable()
@QueryHandler(GetOneBranchesXRequest)
export class GetOneBranchesXHandler implements IQueryHandler<GetOneBranchesXRequest> {
  async execute(query: GetOneBranchesXRequest): Promise<GetOneBranchesXResponse> {
    const branch = await Branches.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return plainToInstance(GetOneBranchesXResponse, branch, { excludeExtraneousValues: true });
  }
}