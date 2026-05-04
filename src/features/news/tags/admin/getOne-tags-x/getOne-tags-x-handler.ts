import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetOneTagsXRequest } from './getOne-tags-x-request';
import { GetOneTagsXResponse } from './getOne-tags-x-response';

@Injectable()
@QueryHandler(GetOneTagsXRequest)
export class GetOneTagsXHandler implements IQueryHandler<GetOneTagsXRequest> {
  async execute(query: GetOneTagsXRequest): Promise<GetOneTagsXResponse> {
    const tag = await Tags.findOneBy({ id: query.id });
    if (!tag) throw new NotFoundException('Tag not found');
    return plainToInstance(GetOneTagsXResponse, tag, { excludeExtraneousValues: true });
  }
}