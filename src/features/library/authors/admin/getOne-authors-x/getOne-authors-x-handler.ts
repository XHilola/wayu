import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneAuthorsXRequest } from './getOne-authors-x-request';
import { GetOneAuthorsXResponse } from './getOne-authors-x-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneAuthorsXRequest)
export class GetOneAuthorsXHandler implements IQueryHandler<GetOneAuthorsXRequest> {
  async execute(query: GetOneAuthorsXRequest): Promise<GetOneAuthorsXResponse> {
    const author = await Authors.findOneBy({ id: query.id });
    if (!author)
      throw new NotFoundException('Author not found');
    return plainToInstance(GetOneAuthorsXResponse,author,{excludeExtraneousValues:true})
  }

}