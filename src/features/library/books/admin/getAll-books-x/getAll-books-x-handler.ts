import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Books } from '../../books.entity';
import { GetAllBooksXRequest } from './getAll-books-x-request';
import { GetAllBooksXResponse } from './getAll-books-x-response';

@QueryHandler(GetAllBooksXRequest)
export class GetAllBooksXHandler implements IQueryHandler<GetAllBooksXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllBooksXRequest): Promise<GetAllBooksXResponse[]> {
    const books = await Books.find({ relations: ['author', 'category'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return books.map((book) => {
      const res = plainToInstance(GetAllBooksXResponse, book, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${book.image}`;
      res.file  = `${baseUrl}/${book.file}`;
      return res;
    });
  }
}