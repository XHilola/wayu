import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAuthorsRequest } from './getAll-authors-request';
import { GetAllAuthorsResponse } from './getAll-authors-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllAuthorsRequest)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsRequest> {
    async execute(query: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse[]> {
        const authors=await Authors.find({relations:['books']});
        return plainToInstance(GetAllAuthorsResponse,authors,{excludeExtraneousValues:true})
    }

}