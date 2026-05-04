import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Books } from '../../books.entity';
import { GetAllBooksRequest } from './getAll-books-request';
import { GetAllBooksResponse } from './getAll-books-response';

@QueryHandler(GetAllBooksRequest)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllBooksRequest): Promise<GetAllBooksResponse[]> {
    const books = await Books.find({ relations: ['author', 'category'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return books.map((book) => {
      const res = plainToInstance(GetAllBooksResponse, book, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${book.image}`;
      res.file  = `${baseUrl}/${book.file}`;
      return res;
    });
  }
}