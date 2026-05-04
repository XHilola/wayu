import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneBooksRequest } from './getOne-books-request';
import { GetOneBooksResponse } from './getOne-books-response';
import { Books } from '../../books.entity';

@QueryHandler(GetOneBooksRequest)
export class GetOneBooksHandler implements IQueryHandler<GetOneBooksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneBooksRequest): Promise<GetOneBooksResponse> {
    const book = await Books.findOne({
      where: { id: query.id },
      relations: ['author', 'category'],
    });
    if (!book) throw new NotFoundException('Book not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneBooksResponse, book, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${book.image}`;
    res.file  = `${baseUrl}/${book.file}`;
    return res;
  }
}