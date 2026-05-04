import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetOneTagsRequest } from './getOne-tags-request';
import { GetOneTagsResponse } from './getOne-tags-response';

@Injectable()
@QueryHandler(GetOneTagsRequest)
export class GetOneTagsHandler implements IQueryHandler<GetOneTagsRequest> {
  async execute(query: GetOneTagsRequest): Promise<GetOneTagsResponse> {
    const tag = await Tags.findOneBy({ id: query.id });
    if (!tag) throw new NotFoundException('Tag not found');
    return plainToInstance(GetOneTagsResponse, tag, { excludeExtraneousValues: true });
  }
}