import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { GetAllBranchesXRequest } from './getAll-branches-x-request';
import { GetAllBranchesXResponse } from './getAll-branches-x-response';

@Injectable()
@QueryHandler(GetAllBranchesXRequest)
export class GetAllBranchesXHandler implements IQueryHandler<GetAllBranchesXRequest> {
  async execute(query: GetAllBranchesXRequest): Promise<GetAllBranchesXResponse[]> {
    const branches = await Branches.find({ relations: ['country', 'representative'] });
    return plainToInstance(GetAllBranchesXResponse, branches, { excludeExtraneousValues: true });
  }
}