import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetAllTagsRequest } from './getAll-tags-request';
import { GetAllTagsResponse } from './getAll-tags-response';

@Injectable()
@QueryHandler(GetAllTagsRequest)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsRequest> {
  async execute(query: GetAllTagsRequest): Promise<GetAllTagsResponse[]> {
    const tags = await Tags.find();
    return plainToInstance(GetAllTagsResponse, tags, { excludeExtraneousValues: true });
  }
}