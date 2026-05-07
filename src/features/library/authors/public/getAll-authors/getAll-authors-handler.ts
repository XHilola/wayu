import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Authors } from '../../authors.entity';
import { GetAllAuthorsRequest } from './getAll-authors-request';
import { GetAllAuthorsResponse } from './getAll-authors-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllAuthorsRequest)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsRequest> {
    async execute(query: GetAllAuthorsRequest): Promise<PaginatedResult> {
        const page = query.page ?? 1;
        const size = query.size ?? 10;
        const skip = (page - 1) * size;

        const [authors, totalCount] = await Authors.findAndCount({
            where: query.fullName ? { fullName: ILike(`%${query.fullName}%`) } : {},
            skip,
            take: size,
        });

        const data = authors.map((author) =>
          plainToInstance(GetAllAuthorsResponse, author, { excludeExtraneousValues: true }),
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