import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { GetOneBranchesRequest } from './getOne-branches-request';
import { GetOneBranchesResponse } from './getOne-branches-response';

@Injectable()
@QueryHandler(GetOneBranchesRequest)
export class GetOneBranchesHandler implements IQueryHandler<GetOneBranchesRequest> {
  async execute(query: GetOneBranchesRequest): Promise<GetOneBranchesResponse> {
    const branch = await Branches.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return plainToInstance(GetOneBranchesResponse, branch, { excludeExtraneousValues: true });
  }
}