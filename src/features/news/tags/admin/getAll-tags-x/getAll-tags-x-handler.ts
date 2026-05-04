import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetAllTagsXRequest } from './getAll-tags-x-request';
import { GetAllTagsXResponse } from './getAll-tags-x-response';

@Injectable()
@QueryHandler(GetAllTagsXRequest)
export class GetAllTagsXHandler implements IQueryHandler<GetAllTagsXRequest> {
  async execute(query: GetAllTagsXRequest): Promise<GetAllTagsXResponse[]> {
    const tags = await Tags.find();
    return plainToInstance(GetAllTagsXResponse, tags, { excludeExtraneousValues: true });
  }
}