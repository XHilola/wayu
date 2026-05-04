import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Branches } from '../../branches.entity';
import { GetAllBranchesRequest } from './getAll-branches-request';
import { GetAllBranchesResponse } from './getAll-branches-response';

@Injectable()
@QueryHandler(GetAllBranchesRequest)
export class GetAllBranchesHandler implements IQueryHandler<GetAllBranchesRequest> {
  async execute(query: GetAllBranchesRequest): Promise<GetAllBranchesResponse[]> {
    const branches = await Branches.find({ relations: ['country', 'representative'] });
    return plainToInstance(GetAllBranchesResponse, branches, { excludeExtraneousValues: true });
  }
}