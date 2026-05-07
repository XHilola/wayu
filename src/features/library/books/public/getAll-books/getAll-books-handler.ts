import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Books } from '../../books.entity';
import { GetAllBooksRequest } from './getAll-books-request';
import { GetAllBooksResponse } from './getAll-books-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ConfigService } from '@nestjs/config';
import { ILike } from 'typeorm';

@QueryHandler(GetAllBooksRequest)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllBooksRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.authorId) where.authorId = query.authorId;
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.year) where.year = query.year;

    const [books, totalCount] = await Books.findAndCount({
      where: Object.keys(where).length ? where : {},
      relations: ['author', 'category'],
      skip,
      take: size,
    });

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const data = books.map((book) => {
      const res = plainToInstance(GetAllBooksResponse, book, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${book.image}`;
      res.file = `${baseUrl}/${book.file}`;
      return res;
    });

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