import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneRepresentativesXRequest } from './getOne-representatives-x-request';
import { ConfigService } from '@nestjs/config';
import { GetOneRepresentativesXResponse } from './getOne-representatives-x-response';
import { Representatives } from '../../representatives.entity';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetOneRepresentativesXRequest)
export class GetOneRepresentativesXHandler implements IQueryHandler<GetOneRepresentativesXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneRepresentativesXRequest): Promise<GetOneRepresentativesXResponse> {
    const representative = await Representatives.findOneBy({ id: query.id });
    if (!representative) throw new NotFoundException('Representative not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneRepresentativesXResponse, representative, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${representative.image}`;
    return res;
  }
}