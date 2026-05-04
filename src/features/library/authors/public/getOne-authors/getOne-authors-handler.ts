import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneAuthorsRequest } from './getOne-authors-request';
import { GetOneAuthorsResponse } from './getOne-authors-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneAuthorsRequest)
export class GetOneAuthorsHandler implements IQueryHandler<GetOneAuthorsRequest> {
  async execute(query: GetOneAuthorsRequest): Promise<GetOneAuthorsResponse> {
    const author = await Authors.findOneBy({ id: query.id });
    if (!author)
      throw new NotFoundException('Author not found');
    return plainToInstance(GetOneAuthorsResponse,author,{excludeExtraneousValues:true})
  }

}