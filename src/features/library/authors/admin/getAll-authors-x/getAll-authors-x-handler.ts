import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAuthorsXRequest } from './getAll-authors-x-request';
import { GetAllAuthorsXResponse } from './getAll-authors-x-response';
import { Authors } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllAuthorsXRequest)
export class GetAllAuthorsXHandler implements IQueryHandler<GetAllAuthorsXRequest> {
    async execute(query: GetAllAuthorsXRequest): Promise<GetAllAuthorsXResponse[]> {
        const authors=await Authors.find({relations:['books']});
        return plainToInstance(GetAllAuthorsXResponse,authors,{excludeExtraneousValues:true})
    }

}