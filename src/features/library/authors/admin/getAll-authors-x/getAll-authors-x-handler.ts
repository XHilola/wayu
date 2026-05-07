import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Authors } from '../../authors.entity';
import { GetAllAuthorsXRequest } from './getAll-authors-x-request';
import { GetAllAuthorsXResponse } from './getAll-authors-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllAuthorsXRequest)
export class GetAllAuthorsXHandler implements IQueryHandler<GetAllAuthorsXRequest> {
    async execute(query: GetAllAuthorsXRequest): Promise<PaginatedResult> {
        const page = query.page ?? 1;
        const size = query.size ?? 10;
        const skip = (page - 1) * size;

        const [authors, totalCount] = await Authors.findAndCount({
            where: query.fullName ? { fullName: ILike(`%${query.fullName}%`) } : {},
            skip,
            take: size,
        });

        const data = authors.map((author) =>
          plainToInstance(GetAllAuthorsXResponse, author, { excludeExtraneousValues: true }),
        );

        const totalPages = Math.ceil(totalCount / size);

        return {
            totalPages,
            previousPage: page > 1 ? page - 1 : undefined,
            currentPage: page,
            nextPage: page < totalPages ? page + 1 : undefined,
            totalCount,
            data,
        };
    }
}