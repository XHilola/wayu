import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneRepresentativesRequest } from './getOne-representatives-request';
import { ConfigService } from '@nestjs/config';
import { GetOneRepresentativesResponse } from './getOne-representatives-response';
import { Representatives } from '../../representatives.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneRepresentativesRequest)
export class GetOneRepresentativesHandler implements IQueryHandler<GetOneRepresentativesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneRepresentativesRequest): Promise<GetOneRepresentativesResponse> {
    const representative = await Representatives.findOneBy({ id: query.id });
    if (!representative) throw new NotFoundException('Representative not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneRepresentativesResponse, representative, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${representative.image}`;
    return res;
  }
}